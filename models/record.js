const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: String, // Date is special type for mongoose, temporary use String 
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

// setting special type for mongoose for MongoDB
// recordSchema.path('date') instanceof mongoose.Date;

module.exports = mongoose.model('Record', recordSchema);
