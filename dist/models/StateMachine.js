"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
const Message_1 = __importDefault(require("./Message"));
const Room_1 = __importDefault(require("./Room"));
class StateMachine {
    constructor() {
        this.rooms = new Map();
        this.id = (0, utils_1.genId)();
    }
    static getInstance() {
        if (!StateMachine.instance) {
            StateMachine.instance = new StateMachine();
        }
        return StateMachine.instance;
    }
    getId() {
        return this.id;
    }
    getRooms() {
        return this.rooms;
    }
    getRoom(roomname) {
        const room = this.rooms.get(roomname);
        return room;
    }
    getRoomMessages(roomname) {
        const room = this.rooms.get(roomname);
        return room ? room.getMessages() : [];
    }
    getRoomNames() {
        return Array.from(this.rooms.keys());
    }
    addRoom(roomname, host) {
        if (!this.rooms.has(roomname)) {
            this.rooms.set(roomname, new Room_1.default(roomname, host));
        }
    }
    addMessageToRoom(roomname, timestamp, message, username, profileImgURL, isHost) {
        let room = this.rooms.get(roomname);
        const newMessage = new Message_1.default(timestamp, message, username, profileImgURL, isHost);
        room && room.addMessage(newMessage);
    }
    addChatUserToRoom(roomname, chatuser) {
        let room = this.rooms.get(roomname);
        room === null || room === void 0 ? void 0 : room.addChatUser(chatuser);
    }
    isUserHost(roomname, username) {
        let room = this.rooms.get(roomname);
        let host = room === null || room === void 0 ? void 0 : room.getHost();
        if ((host === null || host === void 0 ? void 0 : host.getUsername()) === username) {
            return true;
        }
        else {
            return false;
        }
    }
}
StateMachine.instance = undefined;
exports.default = StateMachine;
