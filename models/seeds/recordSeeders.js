const Record = require('../record');
const db = require('../../config/mongoose');
const record = require('./record.json');

// db listener
db.once('open', () => {
  Record.create(record.results)
  .then(() => {
    console.log('recordSeeders done.');
  })
});