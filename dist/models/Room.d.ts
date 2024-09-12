import Message from "./Message";
declare class Room {
    private name;
    private messages;
    constructor(name: string);
    getName(): string;
    getMessages(): Message[];
    addMessage(message: Message): void;
}
export default Room;
//# sourceMappingURL=Room.d.ts.map