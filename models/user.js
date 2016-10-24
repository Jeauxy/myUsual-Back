const mongoose = require('mongoose');

var userSchema = {
  firstName: String,
  lastName: String,
  email: String,
  price: Number,
  userId: String,
  avatar: String,
  source: String,
  lists: [{type: mongoose.Schema.Types.ObjectId, ref: 'List'}],
  //role: [{}],
}

var User = mongoose.model('User', userSchema);
module.exports = User;
