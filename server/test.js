const mongoose = require("mongoose");
const airCondition = require("./model/airCondition");
require("dotenv").config();

const onConnectDB = async () => {
  const { DB_USERNAME, DB_PASSWORD } = process.env;
  const url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.pxfcb.mongodb.net/iot?retryWrites=true&w=majority`;
  mongoose.set("strictQuery", true);
  await mongoose.connect(url).then(() => console.log("Connect"));
};
onConnectDB();
// airCondition
{
  power: "1",
  mode: "1",
  temp: "23",
  swing: "0",
  wind: "2"
}
