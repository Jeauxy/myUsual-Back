const mongoose = require('mongoose');

var storeSchema = {
  name: String,
  inventory: Boolean,
  type: String,
  //foods: [{}],
  address: String
}

var Store = mongoose.models('Store', storeSchema);
modules.export = Store;
