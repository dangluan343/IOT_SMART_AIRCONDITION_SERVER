const express = require("express");
const router = express.Router();

// ========================light sensor========================

router.get("/sensor/light", async (req, res) => {
  try {
    // const { body } = req;
    // const { id } = body;

    // const result = await light.getLight(id);
    console.log("From server: calling get sensor light");
    res.send('sensor light');
  } catch (error) {
    console.log(error);
  }
});
// ========================temperature sensor========================
// ========================humidity sensor========================
router.get("/temp", function (req, res) {
  res.send("from router");
});
// ========================fan========================
// ========================air condition========================

module.exports = router;
