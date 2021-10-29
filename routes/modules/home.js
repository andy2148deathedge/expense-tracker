const express = require('express');
const router = express.Router();

const Record = require('../../models/record');
const Category = require('../../models/category');


router.get('/', (req, res) => {
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then((categories) => {
      let filter = {};
      const selectedCategory = req.query.category;
      if (selectedCategory) filter.category = selectedCategory;
      if (selectedCategory == 'all') filter = {};
      filter.userId = req.user._id;

      Record.find( filter )
        .lean()
        .sort({ _id: 'asc' })
        .then((records) => {
          let totalAmount = 0;
          records.forEach((record) => { totalAmount += record.amount; });
          res.render('index', { records, categories, totalAmount, selectedCategory });
        })
        .catch(e => console(e));
    })
    .catch(e => console.log(e));
  
});


module.exports = router;