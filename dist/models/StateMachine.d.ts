import Message from "./Message";
import Room from "./Room";
declare class StateMachine {
    private static instance;
    private id;
    private rooms;
    private constructor();
    static getInstance(): StateMachine;
    getId(): number;
    getRooms(): Map<string, Room>;
    getRoomMessages(roomname: string): Message[] | void;
    getRoomNames(): string[];
    addRoom(roomname: string): void;
    addMessageToRoom(roomname: string, timestamp: Date, message: string, username: string, profileImgURL: string): void;
}
export default StateMachine;
//# sourceMappingURL=StateMachine.d.ts.map