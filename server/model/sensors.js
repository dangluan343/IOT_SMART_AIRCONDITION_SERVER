const mongoose = require("mongoose");
const sensorSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Sensor", sensorSchema);
