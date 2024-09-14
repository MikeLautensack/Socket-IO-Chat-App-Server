"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = require("node:http");
const socket_io_client_1 = require("socket.io-client");
const socket_io_1 = require("socket.io");
function waitFor(socket, event) {
    return new Promise((resolve) => {
        socket.once(event, resolve);
    });
}
describe("my awesome project", () => {
    let io, serverSocket, clientSocket;
    beforeAll((done) => {
        const httpServer = (0, node_http_1.createServer)();
        io = new socket_io_1.Server(httpServer);
        httpServer.listen(() => {
            const port = httpServer.address().port;
            clientSocket = (0, socket_io_client_1.io)(`http://localhost:${port}`);
            io.on("connection", (socket) => {
                serverSocket = socket;
            });
            clientSocket.on("connect", done);
        });
    });
    afterAll(() => {
        io.close();
        clientSocket.disconnect();
    });
    test("should work", (done) => {
        clientSocket.on("hello", (arg) => {
            expect(arg).toBe("world");
            done();
        });
        serverSocket.emit("hello", "world");
    });
    test("should work with an acknowledgement", (done) => {
        serverSocket.on("hi", (cb) => {
            cb("hola");
        });
        clientSocket.emit("hi", (arg) => {
            expect(arg).toBe("hola");
            done();
        });
    });
    test("should work with emitWithAck()", () => __awaiter(void 0, void 0, void 0, function* () {
        serverSocket.on("foo", (cb) => {
            cb("bar");
        });
        const result = yield clientSocket.emitWithAck("foo");
        expect(result).toBe("bar");
    }));
    test("should work with waitFor()", () => {
        clientSocket.emit("baz");
        return waitFor(serverSocket, "baz");
    });
});
