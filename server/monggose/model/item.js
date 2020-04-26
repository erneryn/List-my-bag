const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema =Schema({
  itemName:{
    type: String,
    required: [true, "item name cannot be empty !"],
  },
  category: String,
  status: String,
  description:String,
});

itemSchema.pre('save', function(next) {
  this.status= "Uncheck"
  next()
})


module.exports = mongoose.model("Item", itemSchema);
