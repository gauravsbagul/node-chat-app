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
  var li = jQuery("<li></li>");
  li.text(`${message.from}: ${message.text}`);

  jQuery("#messages").append(li);
});

socket.on("newLocationMessage", function (message) {
  var li = jQuery("<li></li>");
  var a = jQuery('<a target="_blank">my current location</a>');

  li.text(`${message.from}: `);
  a.attr("href", message.url);
  li.append(a);
  jQuery("#messages").append(li);
});

jQuery("#message-from").on("submit", function (e) {
  e.preventDefault();
  socket.emit(
    "createMessage",
    {
      from: "Gaurav",
      text: jQuery("[name=message]").val(),
    },
    function (feedback) {
      console.log("TCL:: feedback", feedback);
    }
  );
});

var locationButton = jQuery("#send-location");

locationButton.on("click", function () {
  if (!navigator.geolocation) {
    return alert("Geo location not supported by your browser");
  }

  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log("TCL:: position", position);
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    function () {
      alert("Unable to fetch location");
    }
  );
});
