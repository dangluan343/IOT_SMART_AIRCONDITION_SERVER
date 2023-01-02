const express = require("express");
const {
  airConditionModel,
  fanModel,
  sensorsModel,
} = require("../model/allDevices");
const router = express.Router();

// ========================light sensor========================
router.post("/clientB/light", async (req, res) => {
  try {
    console.log("From server: calling get sensor light");
    console.log(req.body);
    const saveData = async () => {
      const data = { code: "light", value: req.body.light };
      const lightData = await new sensorsModel(data);
      try {
        await lightData.save((err) => {
          console.log(err);
        });
      } catch (err) {
        console.log(err);
      }
    };
    saveData();
    // console.log(sensorsModel);
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
    const saveData = async () => {
      const data = { code: "temp", value: req.body.temp };
      const tempData = await new sensorsModel(data);
      try {
        await tempData.save((err) => {
          console.log(err);
        });
      } catch (err) {
        console.log(err);
      }
    };
    saveData();
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
    const saveData = async () => {
      const data = { code: "humi", value: req.body.humi };
      const humiData = await new sensorsModel(data);
      try {
        await humiData.save((err) => {
          console.log(err);
        });
      } catch (err) {
        console.log(err);
      }
    };
    saveData();
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
    const { power, swing, speed } = req.body;
    const saveData = async () => {
      const data = { power: power, swing: swing, speed: speed };
      const fanData = await new fanModel(data);
      try {
        await fanData.save((err) => {
          console.log(err);
        });
      } catch (err) {
        console.log(err);
      }
    };
    saveData();
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
    const { power, mode, temp, swing, wind } = req.body;
    const saveData = async () => {
      const data = { power: power, mode: mode, temp: temp, swing: swing, wind };
      const fanData = await new airConditionModel(data);
      try {
        await fanData.save((err) => {
          console.log(err);
        });
      } catch (err) {
        console.log(err);
      }
    };
    saveData();
    res.send("activator airCondition");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
