const mongoose = require("mongoose");
const fanSchema = mongoose.Schema({
  power: {
    type: Number,
    enum: [0, 1],
    required: true,
  },
  swing: {
    type: Number,
    enum: [0, 1],
  },
  speed: {
    type: Number,
    enum: [0, 1, 2, 3],
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Fan", fanSchema);
