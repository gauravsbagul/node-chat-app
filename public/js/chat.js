/** @format */

var socket = io();

function scrollToBottom() {
    //Selectors
    var messages = jQuery("#messages");
    var newMessage = messages.children("li:last-child");
    //Height
    var clientHeight = messages.prop("clientHeight");
    var scrollTop = messages.prop("scrollTop");
    var scrollHeight = messages.prop("scrollHeight");

    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (
        clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
        scrollHeight
    ) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on("connect", function() {
    console.log("connected to server");
    socket.emit("createEmail", {
        to: "gaurav@example.com",
        text: "Hey this is gaurav",
    });
});
socket.on("disconnect", function() {
    console.log("Disconnected form server");
});

socket.on("newMessage", function(message) {
    var template = jQuery("#message-template").html();

    var html = Mustache.render(template, {
        from: message.from,
        createdAt: moment(message.createdAt).format("h:mm:s a"),
        text: message.text,
    });

    jQuery("#messages").append(html);
    scrollToBottom();
    // var formattedTime = moment(message.createdAt).format("h:mm:s a");
    // var li = jQuery("<li></li>");
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);

    // jQuery("#messages").append(li);
});

socket.on("newLocationMessage", function(message) {
    var template = jQuery("#location-message-template").html();

    var html = Mustache.render(template, {
        from: message.from,
        createdAt: moment(message.createdAt).format("h:mm:s a"),
        url: message.url,
    });

    jQuery("#messages").append(html);
    scrollToBottom();

    // var formattedTime = moment(message.createdAt).format("h:mm:s a");
    // var li = jQuery("<li></li>");
    // var a = jQuery('<a target="_blank">my current location</a>');

    // li.text(`${message.from}: ${formattedTime} `);
    // a.attr("href", message.url);
    // li.append(a);
    // jQuery("#messages").append(li);
});

jQuery("#message-from").on("submit", function(e) {
    e.preventDefault();

    var messageTextBox = jQuery("[name=message]");
    socket.emit(
        "createMessage", {
            from: "User",
            text: messageTextBox.val(),
        },
        function(feedback) {
            messageTextBox.val("");
        }
    );
});

var locationButton = jQuery("#send-location");

locationButton.on("click", function() {
    if (!navigator.geolocation) {
        return alert("Geo location not supported by your browser");
    }

    locationButton.attr("disabled", "disabled").text("Sending location...");

    navigator.geolocation.getCurrentPosition(
        function(position) {
            locationButton.removeAttr("disabled").text("Send location");
            socket.emit("createLocationMessage", {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        },
        function() {
            alert("Unable to fetch location").text("Send location");
            locationButton.removeAttr("disabled");
        }
    );
});