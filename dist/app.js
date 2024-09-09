import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import StateMachine from "./models/StateMachine";
const app = express();
const server = createServer(app);
const port = process.env.PORT || 8080;
// Define allowed origins
const allowedOrigins = [
    "http://localhost:3000",
    "https://socket-io-chat-app-client.vercel.app", // Add your production domain here
];
// Server State
const stateMachine = StateMachine.getInstance();
// Server Instance
const io = new Server(server, {
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
    socket.on("joinRoom", ({ roomname, username }) => {
        socket.join(roomname);
        stateMachine.addRoom(roomname);
        socket.to(roomname).emit("new-user-joined", username);
        io.emit("updateRooms", stateMachine.getRoomNames());
    });
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
    socket.on("message", ({ message, username, profileImg, roomname }) => {
        io.to(roomname).emit("message", { message, username, profileImg });
    });
    socket.on("activity", ({ username, roomId }) => {
        socket.broadcast.to(roomId).emit("activity", username);
    });
});
server.listen(port, () => {
    console.log(`server running on port: ${port}`);
});
