const mongoose = require("mongoose");
const airConditionSchema = mongoose.Schema({
  power: {
    type: Number,
    enum: [0, 1],
    required: true,
  },
  mode: {
    type: Number,
    enum: [0, 1, 2, 3, 4],
    required: true,
  },
  temp: {
    type: Number,
    required: true,
  },
  swing: {
    type: Number,
    enum: [0, 1],
  },
  wind: {
    type: Number,
    enum: [0, 1, 2, 3],
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("AirCondition", airConditionSchema);
