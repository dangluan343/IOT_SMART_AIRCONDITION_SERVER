const mongoose = require("mongoose");
const sensorsSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Sensor", sensorsSchema);
