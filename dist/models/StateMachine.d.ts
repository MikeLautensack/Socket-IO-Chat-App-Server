import ChatUser from "./ChatUser";
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
    getRoom(roomname: string): Room;
    getRoomMessages(roomname: string): Message[];
    getRoomNames(): string[];
    addRoom(roomname: string, host: ChatUser): void;
    addMessageToRoom(roomname: string, timestamp: Date, message: string, username: string, profileImgURL: string, isHost: boolean): void;
    addChatUserToRoom(roomname: string, chatuser: ChatUser): void;
    isUserHost(roomname: string, username: string): boolean;
}
export default StateMachine;
