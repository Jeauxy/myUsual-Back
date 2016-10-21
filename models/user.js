const mongoose = require('mongoose');

var userSchema = {
  firstName: String,
  lastName: String,
  email: String,
  price: Number,
  userId: String,
  avatar: String,
  source: String
  //role: [{}],
}

var User = mongoose.model('User', userSchema);
module.exports = User;
