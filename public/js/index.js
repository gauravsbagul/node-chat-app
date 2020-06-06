/** @format */

var socket = io();
socket.on("connect", function () {
  console.log("connected to server");
  socket.emit("createEmail", {
    to: "gaurav@example.com",
    text: "Hey this is gaurav",
  });
});
socket.on("disconnect", function () {
  console.log("Disconnected form server");
});

socket.on("newMessage", function (message) {
  console.log("TCL:: message", message);
});
