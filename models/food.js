const mongoose = require('mongoose');

var foodSchema = {
  itemName: String,
  description: String,
  price: Number,
  //stores: [{}],
  avgQuantityPurchased: Number,
  picture: String
}

var Food = mongoose.models('Food', foodSchema);
modules.export = Food;
