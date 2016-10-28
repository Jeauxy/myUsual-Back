var mongoose = require('mongoose');

var storeSchema = {
  name: String,
  inventory: Boolean,
  type: String,
  address: String,
  foods: [{type: mongoose.Schema.Types.ObjectId, ref: 'Food'}]
};

var Store = mongoose.model('Store', storeSchema);
module.exports = Store;
