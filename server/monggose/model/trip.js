const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = Schema({
  tripName: {
    type: String,
    required: [true, "trip name cannot be empty !"],
  },
  dueDate: {
    type: Date,
  },
  items:
  [
      {
          type: Schema.Types.ObjectId,
          ref: 'Item',
        },
    ]
  
});

module.exports = mongoose.model("Trip", tripSchema);
