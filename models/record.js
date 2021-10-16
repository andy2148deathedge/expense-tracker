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
    type: Date, // special type for mongoose
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

// setting special type for mongoose for MongoDB
recordSchema.path('date') instanceof mongoose.Date;

module.exports = mongoose.model('Record', recordSchema);
