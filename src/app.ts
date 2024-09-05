import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const port = process.env.PORT || 8080;

// Define allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://socket-io-chat-app-client.vercel.app", // Add your production domain here
];

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
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
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
  console.log("a user connected");

  const rooms = Array.from(io.sockets.adapter.rooms.keys());

  const roomList = rooms.filter((room) => !io.sockets.adapter.sids.get(room));
  console.log("rooms list", roomList);

  socket.emit("roomList", roomList);

  socket.on("joinRoom", ({ roomname, username }) => {
    console.log("testing joinRoom event");
    socket.join(roomname);
    console.log("rooms list", roomList);
    socket.to(roomname).emit("new-user-joined", username);
    io.emit("updatedRooms", roomList);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("message", ({ message, profileImg, roomId }) => {
    io.to(roomId).emit("message", { message, profileImg });
  });

  socket.on("activity", ({ username, roomId }) => {
    socket.broadcast.to(roomId).emit("activity", username);
  });
});

server.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
