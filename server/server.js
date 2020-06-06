/** @format */
const path = require("path");
const http = require("http");

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

  socket.emit("newMessage", {
    from: "Admin",
    text: "Welcome to the chat",
    createdAt: new Date().getTime(),
  });

  socket.broadcast.emit("newMessage", {
    from: "Admin",
    text: "New user join",
    createdAt: new Date().getTime(),
  });

  socket.on("createMessage", (message) => {
    console.log("TCL:: createMessage", message);
    io.emit("newMessage", { ...message, createdAt: new Date().getTime() });

    // socket.broadcast.emit("newMessage", {
    //   ...message,
    //   createdAt: new Date().getTime(),
    // });
  });

  socket.on("disconnect", () => {
    console.log("Disconnected form server");
  });
});

server.listen(port, () => {
  console.log("server is up on", port);
});
