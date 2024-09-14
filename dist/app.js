import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import StateMachine from "./models/StateMachine";
import ChatUser from "./models/ChatUser";
const app = express();
const server = createServer(app);
const port = process.env.PORT || 8080;
const allowedOrigins = [
    "http://localhost:3000",
    "https://socket-io-chat-app-client.vercel.app",
];
let stateMachine = StateMachine.getInstance();
const io = new Server(server, {
    connectionStateRecovery: {
        maxDisconnectionDuration: 2 * 60 * 1000,
        skipMiddlewares: true,
    },
    cors: {
        origin: function (origin, callback) {
            if (!origin)
                return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                var msg = "The CORS policy for this site does not allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        methods: ["GET", "POST"],
        credentials: true,
    },
});
app.get("/", (req, res) => {
    res.send("<h1>Hello world</h1>");
});
io.on("connection", (socket) => {
    const rooms = stateMachine.getRoomNames();
    console.log(`Socket: ${socket.id}, has connected to the server`);
    socket.emit("roomList", rooms);
    socket.on("joinRoom", ({ roomname, username, profileImg }) => {
        const message = "has joined the chat!";
        const date = new Date();
        socket.join(roomname);
        const rooms = stateMachine.getRooms();
        if (!rooms.has(roomname)) {
            stateMachine.addRoom(roomname, new ChatUser(username, profileImg, true));
            let room = stateMachine.getRoom(roomname);
            let chatusers = room?.getChatters();
            let chatters = [];
            chatusers?.forEach((user, key) => {
                chatters.push({
                    username: user.getUsername(),
                    profileImg: user.getProfileImg(),
                    isHost: user.getIsHost(),
                });
            });
            io.to(roomname).emit("setChatters", chatters);
            stateMachine.addMessageToRoom(roomname, date, message, username, profileImg, true);
            socket.to(roomname).emit("userJoinedRoom", {
                username,
                profileImg,
                roomname,
                date,
                message,
                isHost: true,
            });
        }
        else {
            let room = stateMachine.getRoom(roomname);
            room.addChatUser(new ChatUser(username, profileImg, username === room.getHost().getUsername() ? true : false));
            let chatusers = room?.getChatters();
            let chatters = [];
            chatusers?.forEach((user, key) => {
                chatters.push({
                    username: user.getUsername(),
                    profileImg: user.getProfileImg(),
                    isHost: user.getIsHost(),
                });
            });
            io.to(roomname).emit("setChatters", chatters);
            stateMachine.addMessageToRoom(roomname, date, message, username, profileImg, false);
            socket.to(roomname).emit("userJoinedRoom", {
                username,
                profileImg,
                roomname,
                date,
                message,
                isHost: false,
            });
        }
        io.emit("setRooms", stateMachine.getRoomNames());
    });
    socket.on("leaveRoom", ({ roomname, username, profileImg }) => {
        const message = "has left the chat!";
        const date = new Date();
        let room = stateMachine.getRoom(roomname);
        room?.removeChatUser(username);
        let chatusers = room?.getChatters();
        let chatters = [];
        chatusers.forEach((user, key) => {
            chatters.push({
                username: user.getUsername(),
                profileImg: user.getProfileImg(),
                isHost: user.getIsHost(),
            });
        });
        socket.leave(roomname);
        stateMachine.addMessageToRoom(roomname, date, message, username, profileImg, stateMachine.isUserHost(roomname, username));
        socket.broadcast.to(roomname).emit("setChatters", chatters);
        socket
            .to(roomname)
            .emit("userLeftRoom", { username, profileImg, roomname, date, message });
    });
    socket.on("setRoomMessages", (roomname) => {
        const messages = stateMachine.getRoomMessages(roomname);
        const msgArr = messages.map((msg) => {
            return {
                timestamp: msg.getTimestamp(),
                message: msg.getMessage(),
                username: msg.getUsername(),
                profileImg: msg.getProfileImgURL(),
                isHost: msg.getIsHost(),
            };
        });
        socket.emit("setRoomMessages", msgArr);
    });
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
    socket.on("message", ({ message, username, profileImg, roomname, timestamp }) => {
        stateMachine.addMessageToRoom(roomname, timestamp, message, username, profileImg, stateMachine.isUserHost(roomname, username));
        const isHost = stateMachine.isUserHost(roomname, username);
        io.to(roomname).emit("message", {
            message,
            username,
            profileImg,
            timestamp,
            isHost,
        });
    });
    socket.on("activity", ({ username, roomname }) => {
        socket.broadcast.to(roomname).emit("activity", username);
    });
});
server.listen(port, () => {
    console.log(`server running on port: ${port}`);
});
//# sourceMappingURL=app.js.map