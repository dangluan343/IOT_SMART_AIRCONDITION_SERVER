const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const parseJson = bodyParser.json();
const parseText = bodyParser.text();
const port = 8080;

const onConnectDB = async () => {
  const { DB_USERNAME, DB_PASSWORD } = process.env;
  const url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.pxfcb.mongodb.net/iot?retryWrites=true&w=majority`;
  mongoose.set("strictQuery", true);
  await mongoose.connect(url).then(() => console.log("Connect"));
};
onConnectDB();

const app = express();
app.use(parseJson);
app.use(parseText);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", require("./routes/app"));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
