const mongoose = require('mongoose');

var foodSchema = {
  itemName: String,
  description: String,
  price: Number,
  stores: [{type: mongoose.Schema.Types.ObjectId, ref: 'Store'}],
  lists: [{type: mongoose.Schema.Types.ObjectId, ref: 'List'}],
  avgQuantityPurchased: Number,
  picture: String
};

var Food = mongoose.model('Food', foodSchema);
module.exports = Food;
