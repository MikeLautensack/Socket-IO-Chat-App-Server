import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const app = express();
const server = createServer(app);
const port = process.env.PORT || 8080;

// Define allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://your-production-domain.com", // Add your production domain here
];

const io = new Server(server, {
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

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("message", (msg) => {
    console.log("server___ message event");
    io.emit("message", msg);
  });
});

server.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
