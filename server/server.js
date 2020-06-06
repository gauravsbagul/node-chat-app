/** @format */
const path = require("path");
const http = require("http");
const { generateMessage, generateLocationMessage } = require("./utils/message");

const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");

const port = process.env.PORT || 3000;
const app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.emit(
    "newMessage",
    generateMessage("Admin", "Welcome to the chat app")
  );

  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "New user joined")
  );

  socket.on("createMessage", (message, callBack) => {
    io.emit("newMessage", generateMessage(message.from, message.text));
    callBack("This is from server");
  });

  socket.on("createLocationMessage", (coords) => {
    console.log("TCL:: coords", coords);
    io.emit(
      "newLocationMessage",
      generateLocationMessage(
        "Admin",
        `${coords.latitude}`,
        `${coords.longitude}`
      )
    );
  });

  socket.on("disconnect", () => {
    console.log("Disconnected form server");
  });
});

server.listen(port, () => {
  console.log("server is up on", port);
});
