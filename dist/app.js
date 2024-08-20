"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_http_1 = require("node:http");
const node_url_1 = require("node:url");
const node_path_1 = require("node:path");
const app = (0, express_1.default)();
const server = (0, node_http_1.createServer)(app);
const port = process.env.PORT || 8080;
const __dirname = (0, node_path_1.dirname)((0, node_url_1.fileURLToPath)(import.meta.url));
app.get("/", (req, res) => {
    res.sendFile((0, node_path_1.join)(__dirname, "index.html"));
});
app.get("/", (req, res) => {
    res.send("<h1>Hello world....</h1>");
});
server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});
