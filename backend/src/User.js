const mongoose = require('mongoose');
const { stringify } = require('querystring');

const user = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  isAdmin: {
    type: Boolean,
    default: false
  },
  refreshToken: String,
  data: Object,
})

module.exports = mongoose.model('User', user)