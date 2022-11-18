const mongoose = require('mongoose');

const user = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  isAdmin: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('User', user)