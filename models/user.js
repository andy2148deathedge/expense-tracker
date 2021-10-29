const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now // 不加括號在調用 default 時才會建立這個時間，用括號則引入就會當下執行了 會有時間誤差
  }
});

module.exports = mongoose.model('User', userSchema);