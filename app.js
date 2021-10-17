// import library
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const hbsHelpers = require('handlebars-helpers');

// import self made library
const Record = require('./models/record');
const Category = require('./models/category');
const category = require('./models/category');

// DB connect
require('./config/mongoose');

// express setting
const app = express();
const PORT = 3000;
const helpers = hbsHelpers();

// setting & middleware
app.engine('hbs', exphbs({ defaultLayout: "main", extname: "hbs", helpers: helpers}));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


// routing
app.get('/', (req, res) => {
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then((categories) => {
      let filter = {};
      const selectedCategory = req.query.category;
      if (selectedCategory) filter.category = selectedCategory;
      if (selectedCategory == 'all') filter = {};

      Record.find( filter )
        .lean()
        .sort({ _id: 'asc' })
        .then((records) => {
          let totalAmount = 0;
          records.forEach((record) => { totalAmount += record.amount; })
          res.render('index', { records, categories, totalAmount, selectedCategory });
        })
        .catch(e => console(e));
    })
    .catch(e => console.log(e));
  
});

app.get('/new', (req, res) => {
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then((categories) => {
      res.render('new', {categories});
    })
    .catch(e => console(e));
});

app.post('/record', (req, res) => {
  // 拿到 new 表單內容存入資料庫 並且重定向至 '/'
  let newRecord = req.body;
  newRecord.amount = Number(newRecord.amount);
  Record.create(newRecord);
  
  res.redirect('/');
});

app.get('/record/:_id/edit', (req, res) => {
  const id = req.params._id;

  return Category.find()
    .lean()
    .sort({ _id: 'asc'})
    .then((categories) => Record.findById(id)
      .lean()
      .then(record => res.render('edit', {categories, record}))
      .catch(e => console.log(e)) )
    .catch(e => console.log(e))
});

app.put('/record/:id', (req, res) => {
  const id = req.params.id;
  let newRecord = req.body;
  newRecord.amount = Number(newRecord.amount);

  return Record.updateOne({ _id: id }, newRecord)
    .then(() => res.redirect('/'))
    .catch(e => console.log(e));
});

app.delete('/record/:id', (req, res) => {
  const id = req.params.id;
  return Record.deleteOne({ _id: id })
    .then(() => res.redirect('/'))
    .catch(e => console.log(e));
});

// Server listen
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});