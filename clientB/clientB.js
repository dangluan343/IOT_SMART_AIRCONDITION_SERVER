var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://test.mosquitto.org", {
  clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
  port: 1883,
});
console.log("console 1:     connected flag  " + client.connected);

//handle incoming messages
client.on("message", function (topic, message, packet) {
  console.log(
    "console 2:     message: " +
      message +
      ", topic: " +
      topic +
      ", packet: " +
      JSON.stringify(packet)
  );
  
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

var topic = "node/clientB";
console.log("subscribing to topics");
client.subscribe(topic, { qos: 1 }); //single topic

console.log("console 5:     end of script");
