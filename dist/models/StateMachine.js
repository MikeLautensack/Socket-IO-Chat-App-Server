import { genId } from "../utils/utils";
import Message from "./Message";
import Room from "./Room";
class StateMachine {
    static instance = undefined;
    id;
    rooms = new Map();
    constructor() {
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
        room?.addChatUser(chatuser);
    }
    isUserHost(roomname, username) {
        let room = this.rooms.get(roomname);
        let host = room?.getHost();
        if (host?.getUsername() === username) {
            return true;
        }
        else {
            return false;
        }
    }
}
export default StateMachine;
//# sourceMappingURL=StateMachine.js.map