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
    getRoomMessages(roomname) {
        this.rooms.forEach((room, key) => {
            if (room.getName() === roomname) {
                return room.getMessages();
            }
        });
    }
    getRoomNames() {
        let names = [];
        this.rooms.forEach((value, key) => {
            names.push(value.getName());
        });
        return names;
    }
    addRoom(roomname) {
        this.rooms.set(roomname, new Room(roomname));
    }
    addMessageToRoom(roomname, timestamp, message, username, profileImgURL) {
        this.rooms.forEach((room, key) => {
            if (room.getName() === roomname) {
                const newMessage = new Message(timestamp, message, username, profileImgURL);
                room.addMessage(newMessage);
            }
        });
    }
}
export default StateMachine;
//# sourceMappingURL=StateMachine.js.map