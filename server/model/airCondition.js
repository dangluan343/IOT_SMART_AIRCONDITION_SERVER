const mongoose = require("mongoose");
const airConditionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  power: {
    type: Number,
    required: true,
  },
  mode: {
    type: Number,
    required: true,
  },
  temp: {
    type: Number,
    required: true,
  },
  swing: {
    type: Number,
  },
  wind: {
    type: Number,
  },
});
module.exports = mongoose.model("airCondition", airConditionSchema);
