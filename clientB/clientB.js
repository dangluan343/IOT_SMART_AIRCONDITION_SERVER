const mqtt = require("mqtt");
const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const client = mqtt.connect("mqtt://test.mosquitto.org", {
  clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
  port: 1883,
});

console.log("console 1:     connected flag  " + client.connected);

app.use(bodyParser.json());
app.post("/new/public", (req, res) => {
  console.log(req.body);
  // publish("clientB/airCondition", { ...req.body.airConditionData });
  // publish("clientB/fan", { ...req.body.fanData });

  res.send("success!");
});
//handle incoming messages
client.on("message", function (topic, message) {
  console.log("console 2:     message: " + message + ", topic: " + topic);
  const topic_arr = topic.split("/");
  const [client, nodeName] = [...topic_arr];
  //localhost:8080
  const url = `http://localhost:8080/${client}/${nodeName}`;
  const data = { ...JSON.parse(message.toString()), topic: topic };
  const sendData = async () => {
    await axios({
      method: "post",
      url: url,
      data: data,
    });
  };
  sendData();
});

client.on("connect", function () {
  console.log("console 3:    connected  " + client.connected);
});
//handle errors
client.on("error", function (error) {
  console.log("Can't connect" + error);
  process.exit(1);
});
function publish(topic, msg) {
  console.log(" console 4:      publishing", msg);

  if (client.connected == true) {
    client.publish(topic, msg);
  }
}

//////////////
app.listen(8079, () => {
  console.log("listening on 8079");
});

const topic_list = [
  "clientB/light",
  "clientB/humi",
  "clientB/temp",
  "clientB/airCondition",
  "clientB/fan",
];
console.log("subscribing to topics");
client.subscribe(topic_list); //single topic

console.log("console 5:     end of script");
