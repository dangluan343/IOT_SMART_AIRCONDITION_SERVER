const mqtt = require("mqtt");

const options = {
  port: 1883,
  clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
};

const clientA = mqtt.connect("mqtt://test.mosquitto.org", options);

function publicMessage(topic, message) {
  console.log("public message", message);
  if (clientA.connected == true) {
    clientA.publish(topic, message);
  }
}

clientA.on("connect", function () {
  console.log("connected");
  //   clientA.publish("present", "Hi there!");
});

clientA.on("message", function (topic, message) {
  console.log("from message");
  publicMessage("present", "hi from message");
  client.end();
});
