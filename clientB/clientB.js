const mqtt = require("mqtt");
const axios = require("axios");

const client = mqtt.connect("mqtt://test.mosquitto.org", {
  clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
  port: 1883,
});
console.log("console 1:     connected flag  " + client.connected);

//handle incoming messages
client.on("message", function (topic, message) {
  console.log("console 2:     message: " + message + ", topic: " + topic);
  const topic_arr = topic.split("/");
  const [client, nodeName] = [...topic_arr];
  //localhost:8080
  const url = `http://localhost:8080/${client}/${nodeName}`;
  const data = { ...JSON.parse(message.toString()), topic: topic };
  // console.log(data);
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

//////////////

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
