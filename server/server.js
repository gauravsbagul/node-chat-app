/** @format */
const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const { Users } = require("./utils/users");
const { generateMessage, generateLocationMessage } = require("./utils/message");
const { isRealString } = require("./utils/validation");

const publicPath = path.join(__dirname, "../public");

const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("New user connected");

    socket.on("join", (params, callBack) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callBack("Name or room name are required");
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit("updateUserList", users.getUserList(params.room));

        socket.emit(
            "newMessage",
            generateMessage("Admin", "Welcome to the chat app")
        );

        socket.broadcast
            .to(params.room)
            .emit(
                "newMessage",
                generateMessage("Admin", `${params.name} has joined`)
            );
        callBack();
    });

    socket.on("createMessage", (message, callBack) => {
        io.emit("newMessage", generateMessage(message.from, message.text));
        callBack();
    });

    socket.on("createLocationMessage", (coords) => {
        io.emit(
            "newLocationMessage",
            generateLocationMessage("User", coords.latitude, coords.longitude)
        );
    });

    socket.on("disconnect", () => {
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit("updateUserList", users.getUserList(user.room));
            io.to(user.room).emit(
                "newMessage",
                generateMessage("Admin", `${user.name} has left.`)
            );
        }
    });
});

server.listen(port, () => {
    console.log("server is up on", port);
});