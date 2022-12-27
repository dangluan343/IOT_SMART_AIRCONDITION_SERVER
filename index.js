const express = require("express");
const bodyParser = require("body-parser");

const parseJson = bodyParser.json();
const parseText = bodyParser.text();
const port = 8080;

const app = express();
app.use(parseJson);
app.use(parseText);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", requrie("./routes/app"));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
