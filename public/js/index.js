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

  var li = jQuery("<li></li>");
  li.text(`${message.from}: ${message.text}`);

  console.log("TCL:: li", li);
  jQuery("#messages").append(li);
});

socket.emit(
  "createMessage",
  {
    from: "Frank",
    text: "hi",
  },
  function (feedback) {
    console.log("TCL:: feedback", feedback);
  }
);

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
