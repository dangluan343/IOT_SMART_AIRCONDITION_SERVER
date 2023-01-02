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
});
module.exports = mongoose.model("airCondition", airConditionSchema);
