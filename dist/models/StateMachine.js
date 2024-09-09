import { genId } from "../utils/utils";
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
}
export default StateMachine;
