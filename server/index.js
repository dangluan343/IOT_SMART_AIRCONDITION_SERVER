const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
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
app.use(express.static("public"));
app.use(cors());

console.log(__dirname + "\\public");

app.set("view engine", "ejs");
app.set("views", "./views");
// app.use(express.static('public'))

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", require("./routes/app"));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
