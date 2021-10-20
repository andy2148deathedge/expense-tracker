const express = require('express');
const router = express.Router();

const Record = require('../../models/record');
const Category = require('../../models/category');


router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then((categories) => {
      res.render('new', {categories});
    })
    .catch(e => console(e));
});

router.post('/', (req, res) => {
  // 拿到 new 表單內容存入資料庫 並且重定向至 '/'
  let newRecord = req.body;
  newRecord.amount = Number(newRecord.amount);
  Record.create(newRecord)
    .catch(e => console.log(e));
  
  res.redirect('/');
});

router.get('/:_id/edit', (req, res) => {
  const id = req.params._id;

  return Category.find()
    .lean()
    .sort({ _id: 'asc'})
    .then((categories) => Record.findById(id)
      .lean()
      .then(record => res.render('edit', {categories, record}))
      .catch(e => console.log(e)) )
    .catch(e => console.log(e));
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  let newRecord = req.body;
  newRecord.amount = Number(newRecord.amount);

  return Record.updateOne({ _id: id }, newRecord)
    .then(() => res.redirect('/'))
    .catch(e => console.log(e));
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  return Record.deleteOne({ _id: id })
    .then(() => res.redirect('/'))
    .catch(e => console.log(e));
});


module.exports = router;