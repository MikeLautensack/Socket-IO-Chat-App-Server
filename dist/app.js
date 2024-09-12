import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import StateMachine from "./models/StateMachine";
const app = express();
const server = createServer(app);
const port = process.env.PORT || 8080;
const allowedOrigins = [
    "http://localhost:3000",
    "https://socket-io-chat-app-client.vercel.app",
];
const stateMachine = StateMachine.getInstance();
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
    socket.on("joinRoom", ({ roomname, username }) => {
        socket.join(roomname);
        stateMachine.addRoom(roomname);
        socket.to(roomname).emit("userJoinedRoom", username);
        io.emit("setRooms", stateMachine.getRoomNames());
    });
    socket.on("setRoomMessages", (roomname) => {
        const messages = stateMachine.getRoomMessages(roomname);
        socket.emit("setRoomMessages", messages);
    });
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
    socket.on("message", ({ message, username, profileImg, roomname, timestamp }) => {
        stateMachine.addMessageToRoom(roomname, timestamp, message, username, profileImg);
        io.to(roomname).emit("message", { message, username, profileImg });
    });
    socket.on("activity", ({ username, roomId }) => {
        socket.broadcast.to(roomId).emit("activity", username);
    });
});
server.listen(port, () => {
    console.log(`server running on port: ${port}`);
});
//# sourceMappingURL=app.js.map