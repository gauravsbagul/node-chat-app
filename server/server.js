/** @format */
const path = require("path");
const express = require("express");
const publicPath = path.join(__dirname, "../public");

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(publicPath));
app.get("/", (req, res) => {
  res.send("Welcome to heroku chat app");
});

app.listen(port, () => {
  console.log("TCL:: server is up at", port);
});
