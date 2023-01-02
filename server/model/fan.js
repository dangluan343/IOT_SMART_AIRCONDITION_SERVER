const mongoose = require("mongoose");
const fanSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  power: {
    type: Number,
    required: true,
  },
  swing: {
    type: Number,
  },
  speed: {
    type: Number,
  },
});
module.exports = mongoose.model("fan", fanSchema);
