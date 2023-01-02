const express = require("express");
const {
  airConditionModel,
  fanModel,
  sensorsModel,
} = require("../model/allDevices");
const router = express.Router();

router.get("/clientB/home", async (req, res) => {
  try {
    const sortLightData = await sensorsModel
      .find({ code: "light" })
      .sort({ created_date: -1 });
    const sortTempData = await sensorsModel
      .find({ code: "temp" })
      .sort({ created_date: -1 });
    const sortHumiData = await sensorsModel
      .find({ code: "humi" })
      .sort({ created_date: -1 });
    const sortFanData = await fanModel.find({}).sort({ created_date: -1 });
    const sortAirConditionData = await airConditionModel
      .find({})
      .sort({ created_date: -1 });

    const lastLightData = sortLightData[0].value;
    const lastTempData = sortTempData[0].value;
    const lastHumiData = sortHumiData[0].value;
    const lastFanData = sortFanData[0];
    const lastAirConditionData = sortAirConditionData[0];
    console.log(lastAirConditionData, lastFanData);
    res.render("home", {
      light: lastLightData,
      humi: lastHumiData,
      temp: lastTempData,
      fan: {
        speed: lastFanData.speed,
        swing: lastFanData.swing,
      },
      airCondition: {
        power: lastAirConditionData.power,
        mode: lastAirConditionData.mode,
        temp: lastAirConditionData.temp,
        swing: lastAirConditionData.swing,
        wind: lastAirConditionData.wind,
      },
    });
  } catch (err) {
    console.error(err);
  }
});

// ========================light sensor========================
router.get("/clientB/light/last", async (req, res) => {
  try {
    console.log("From server: calling get sensor light");
    const getLastData = async () => {
      try {
        const sortLightData = await sensorsModel
          .find({ code: "light" })
          .sort({ created_date: -1 });
        const lastLightData = sortLightData[0];
        console.log(lastLightData);
      } catch (err) {
        console.log(err);
      }
    };
    getLastData();
    // console.log(sensorsModel);
    res.send("get last sensor light value");
  } catch (error) {
    console.log(error);
  }
});
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
router.get("/clientB/temp/last", async (req, res) => {
  try {
    console.log("From server: calling get sensor temp");
    const getLastData = async () => {
      try {
        const sortTempData = await sensorsModel
          .find({ code: "temp" })
          .sort({ created_date: -1 });
        const lastTempData = sortTempData[0];
        console.log(lastTempData);
      } catch (err) {
        console.log(err);
      }
    };
    getLastData();
    // console.log(sensorsModel);
    res.send("get last sensor light value");
  } catch (error) {
    console.log(error);
  }
});
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
router.get("/clientB/humi/last", async (req, res) => {
  try {
    console.log("From server: calling get sensor humi");
    const getLastData = async () => {
      try {
        const sortHumiData = await sensorsModel
          .find({ code: "humi" })
          .sort({ created_date: -1 });
        const lastHumiData = sortHumiData[0];
        console.log(lastHumiData);
      } catch (err) {
        console.log(err);
      }
    };
    getLastData();
    // console.log(sensorsModel);
    res.send("get last sensor light value");
  } catch (error) {
    console.log(error);
  }
});
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
router.get("/clientB/fan/last", async (req, res) => {
  try {
    console.log("From server: calling get activator fan");
    const getLastData = async () => {
      try {
        const sortFanData = await fanModel.find({}).sort({ created_date: -1 });
        const lastFanData = sortFanData[0];
        console.log(lastFanData);
      } catch (err) {
        console.log(err);
      }
    };
    getLastData();
    // console.log(sensorsModel);
    res.send("get last activator fan value");
  } catch (error) {
    console.log(error);
  }
});
router.post("/clientB/fan", async (req, res) => {
  try {
    console.log("From server: calling get activator fan");
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
router.get("/clientB/airCondition/last", async (req, res) => {
  try {
    console.log("From server: calling get activator airCondition");
    const getLastData = async () => {
      try {
        const sortAirConditionData = await airConditionModel
          .find({})
          .sort({ created_date: -1 });
        const lastAirConditionData = sortAirConditionData[0];
        console.log(lastAirConditionData);
      } catch (err) {
        console.log(err);
      }
    };
    getLastData();
    // console.log(sensorsModel);
    res.send("get last activator air condition value");
  } catch (error) {
    console.log(error);
  }
});
router.post("/clientB/airCondition", async (req, res) => {
  try {
    console.log("From server: calling get activator airCondition");
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

// ========================test========================
router.get("/test", (req, res) => {
  const sortDB = async () => {
    const fanData = await fanModel.aggregate().sort({ created_date: -1 });
    console.log(fanData);
  };
  sortDB();
  res.send("test");
});

module.exports = router;
