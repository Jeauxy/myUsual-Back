const mongoose = require('mongoose');

var listSchema = {
  listName: String,
  foods: []
}

var List = mongoose.model("List", listSchema);
module.exports = List;
