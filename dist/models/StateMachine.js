import { genId } from "../utils/utils";
import Message from "./Message";
import Room from "./Room";
class StateMachine {
    constructor() {
        this.rooms = new Map();
        this.id = genId();
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
            this.rooms.set(roomname, new Room(roomname, host));
        }
    }
    addMessageToRoom(roomname, timestamp, message, username, profileImgURL, isHost) {
        let room = this.rooms.get(roomname);
        const newMessage = new Message(timestamp, message, username, profileImgURL, isHost);
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
export default StateMachine;
//# sourceMappingURL=StateMachine.js.map