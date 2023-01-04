const express = require("express");
const {
  airConditionModel,
  fanModel,
  sensorsModel,
} = require("../model/allDevices");
const router = express.Router();
const axios = require("axios");

// ========================server========================
router.get("/server", async (req, res) => {
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
    console.log("from server");
    res.status(200).send({
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

// ========================home========================
router.get("/clientB/home", async (req, res) => {
  try {
    // const sortLightData = await sensorsModel
    //   .find({ code: "light" })
    //   .sort({ created_date: -1 });
    // const sortTempData = await sensorsModel
    //   .find({ code: "temp" })
    //   .sort({ created_date: -1 });
    // const sortHumiData = await sensorsModel
    //   .find({ code: "humi" })
    //   .sort({ created_date: -1 });
    // const sortFanData = await fanModel.find({}).sort({ created_date: -1 });
    // const sortAirConditionData = await airConditionModel
    //   .find({})
    //   .sort({ created_date: -1 });

    // const lastLightData = sortLightData[0].value;
    // const lastTempData = sortTempData[0].value;
    // const lastHumiData = sortHumiData[0].value;
    // const lastFanData = sortFanData[0];
    // const lastAirConditionData = sortAirConditionData[0];
    console.log("from server");
    // res.status(200).send({
    //   light: lastLightData,
    //   humi: lastHumiData,
    //   temp: lastTempData,
    //   fan: {
    //     speed: lastFanData.speed,
    //     swing: lastFanData.swing,
    //   },
    //   airCondition: {
    //     power: lastAirConditionData.power,
    //     mode: lastAirConditionData.mode,
    //     temp: lastAirConditionData.temp,
    //     swing: lastAirConditionData.swing,
    //     wind: lastAirConditionData.wind,
    //   },
    // });
    res.render("home");
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
        res.send(lastLightData);
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
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
        res.status(500).send(err);
      }
    };
    saveData();
    // console.log(sensorsModel);
    res.redirect("save light data");
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
        res.send(lastTempData);
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }
    };
    getLastData();
    // console.log(sensorsModel);
    // res.send("save temp data");
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
        res.send(data);
      } catch (err) {
        res.status(500).send(err);
        console.log(err);
      }
    };
    saveData();
    res.send("save temp data");
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
        res.send(lastHumiData);
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }
    };
    getLastData();
    // console.log(sensorsModel);
    // res.send("get last sensor light value");
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
        res.status(500).send(err);
      }
    };
    saveData();
    res.send("save humi data");
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
        res.send(lastFanData);
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
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
        res.status(500).send(err);
      }
    };
    saveData();
    res.send("save fan data");
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
        res.send(lastAirConditionData);
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
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
      const airConditionData = await new airConditionModel(data);
      try {
        await airConditionData.save((err) => {
          console.log(err);
        });
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }
    };
    saveData();
    res.send("save airCondition data");
  } catch (error) {
    console.log(error);
  }
});

// ========================send data to devices========================
router.post("/clientB/update/node", async (req, res) => {
  console.log(req.body);
  const url = "http://localhost:8079/new/public";
  await axios({
    method: "post",
    url: url,
    data: req.body,
  })
    .then((res) => {
      const saveFanData = async () => {
        const { swing, speed } = req.body.fanData;

        const data = { swing: parseInt(swing), speed: parseInt(speed) };
        const fanData = await new fanModel(data);
        try {
          await fanData.save((err) => {
            console.log(err);
          });
        } catch (err) {
          console.log(err);
        }
      };
      saveFanData();
      const saveAirData = async () => {
        const { power, mode, temp, swing, wind } = req.body.airConditionData;
        const data = {
          power: parseInt(power),
          mode: parseInt(mode),
          temp: parseInt(temp),
          swing: parseInt(swing),
          wind: parseInt(wind),
        };
        const airData = await new airConditionModel(data);
        try {
          await airData.save((err) => {
            console.log(err);
          });
        } catch (err) {
          console.log(err);
        }
      };
      saveAirData();
    })
    .catch((err) => {
      console.log(err);
    });
});

// ========================test========================
router.get("/test", (req, res) => {
  res.redirect("http://localhost:5500/ui/index.html");
});

module.exports = router;
