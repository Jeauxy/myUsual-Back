const mongoose = require('mongoose');

var foodSchema = {
  itemName: String,
  description: String,
  price: Number,
  //stores: [{}],
  avgQuantityPurchased: Number,
  picture: String
}

var Food = mongoose.model('Food', foodSchema);
module.exports = Food;
