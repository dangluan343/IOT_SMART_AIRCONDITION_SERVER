var mqtt = require("mqtt");
var count = 0;
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
//publish
function publish(topic, msg, options) {
  console.log(" console 4:      publishing", msg);

  if (client.connected == true) {
    client.publish(topic, msg, options);
  }
  count += 1;
  if (count == 2)
    //ens script
    clearTimeout(timer_id); //stop timer
  client.end();
}

//////////////

var options = {
  retain: true,
  qos: 1,
};
var topic = "present";
var message = "test message";
var topic_list = ["topic2", "topic3", "topic4"];
var topic_o = { topic22: 0, topic33: 1, topic44: 1 };
console.log("subscribing to topics");
client.subscribe(topic, { qos: 1 }); //single topic
// client.subscribe(topic_list, { qos: 1 }); //topic list
// client.subscribe(topic_o); //object
// var timer_id = setInterval(function () {
//   publish(topic, message, options);
// }, 5000);
//notice this is printed even before we connect
console.log("console 5:     end of script");
