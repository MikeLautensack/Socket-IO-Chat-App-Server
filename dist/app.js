"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_http_1 = require("node:http");
const socket_io_1 = require("socket.io");
const StateMachine_1 = __importDefault(require("./models/StateMachine"));
const ChatUser_1 = __importDefault(require("./models/ChatUser"));
const app = (0, express_1.default)();
const server = (0, node_http_1.createServer)(app);
const port = process.env.PORT || 8080;
// Define allowed origins
const allowedOrigins = [
    "http://localhost:3000",
    "https://socket-io-chat-app-client.vercel.app", // Add your production domain here
];
// Server State
let stateMachine = StateMachine_1.default.getInstance();
// Server Instance
const io = new socket_io_1.Server(server, {
    connectionStateRecovery: {
        // the backup duration of the sessions and the packets
        maxDisconnectionDuration: 2 * 60 * 1000,
        // whether to skip middlewares upon successful recovery
        skipMiddlewares: true,
    },
    cors: {
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps or curl requests)
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
        // Join Room
        socket.join(roomname);
        // State Mutations
        const rooms = stateMachine.getRooms();
        if (!rooms.has(roomname)) {
            stateMachine.addRoom(roomname, new ChatUser_1.default(username, profileImg, true));
            let room = stateMachine.getRoom(roomname);
            let chatusers = room === null || room === void 0 ? void 0 : room.getChatters();
            let chatters = [];
            chatusers === null || chatusers === void 0 ? void 0 : chatusers.forEach((user, key) => {
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
            room.addChatUser(new ChatUser_1.default(username, profileImg, username === room.getHost().getUsername() ? true : false));
            let chatusers = room === null || room === void 0 ? void 0 : room.getChatters();
            let chatters = [];
            chatusers === null || chatusers === void 0 ? void 0 : chatusers.forEach((user, key) => {
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
        // Get Room
        let room = stateMachine.getRoom(roomname);
        // Remove Chat User From State
        room === null || room === void 0 ? void 0 : room.removeChatUser(username);
        let chatusers = room === null || room === void 0 ? void 0 : room.getChatters();
        let chatters = [];
        chatusers.forEach((user, key) => {
            chatters.push({
                username: user.getUsername(),
                profileImg: user.getProfileImg(),
                isHost: user.getIsHost(),
            });
        });
        // Leave Room
        socket.leave(roomname);
        // State Mutations
        stateMachine.addMessageToRoom(roomname, date, message, username, profileImg, stateMachine.isUserHost(roomname, username));
        // Emit Events
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
