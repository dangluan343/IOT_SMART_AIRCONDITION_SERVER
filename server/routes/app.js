const express = require("express");
const router = express.Router();

// ========================light sensor========================
router.post("/clientB/light", async (req, res) => {
  try {
    console.log("From server: calling get sensor light");
    console.log(req.body);
    res.send("sensor light");
  } catch (error) {
    console.log(error);
  }
});
// ========================temperature sensor========================
router.post("/clientB/temp", async (req, res) => {
  try {
    console.log("From server: calling get sensor temp");
    console.log(req.body);
    res.send("sensor temp");
  } catch (error) {
    console.log(error);
  }
});
// ========================humidity sensor========================
router.post("/clientB/humi", async (req, res) => {
  try {
    console.log("From server: calling get sensor humi");
    console.log(req.body);
    res.send("sensor humi");
  } catch (error) {
    console.log(error);
  }
});
// ========================fan========================
router.post("/clientB/fan", async (req, res) => {
  try {
    console.log("From server: calling get sensor fan");
    console.log(req.body);
    res.send("activator fan");
  } catch (error) {
    console.log(error);
  }
});
// ========================air condition========================
router.post("/clientB/airCondition", async (req, res) => {
  try {
    console.log("From server: calling get sensor airCondition");
    console.log(req.body);
    res.send("activator airCondition");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
