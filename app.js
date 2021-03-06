// import library
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const hbsHelpers = require('handlebars-helpers')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
};

// import self made library
const routes = require('./routes')

const usePassport = require('./config/passport')
require('./config/mongoose')

// express setting
const app = express()
const PORT = process.env.PORT
const helpers = hbsHelpers()

// setting & middleware
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs', helpers: helpers }))
app.set('view engine', 'hbs')
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// routing
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(routes)

// Server listen
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`)
})
