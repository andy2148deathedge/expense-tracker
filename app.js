// import library
const express = require('express');
const exphbs = require('express-handlebars');
// const mongoose = require('mongoose');

// import self made library
const Record = require('./models/record');
const Category = require('./models/category');

// DB connect
require('./config/mongoose');

// express setting
const app = express();
const PORT = 3000;

// setting & middleware
app.engine('hbs', exphbs({ defaultLayout: "main", extname: "hbs" }));
app.set('view engine', 'hbs');


// routing
app.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ _id: 'asc' })
    .then((records) => {
      let totalAmount = 0;
      records.forEach((record) => { totalAmount += record.amount; })

      res.render('index', { records, totalAmount });
    })
    .catch(e => console(e));
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
  res.send('new表單送出了');
});


// Server listen
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});