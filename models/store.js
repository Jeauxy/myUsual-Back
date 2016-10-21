const mongoose = require('mongoose');

var storeSchema = {
  name: String,
  inventory: Boolean,
  type: String,
  //foods: [{}],
  address: String
}

var Store = mongoose.model('Store', storeSchema);
module.exports = Store;
