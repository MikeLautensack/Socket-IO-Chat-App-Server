import ChatUser from "./ChatUser";
import Message from "./Message";
declare class Room {
    private name;
    private messages;
    private host;
    private chatters;
    constructor(name: string, host: ChatUser);
    getName(): string;
    getMessages(): Message[];
    getHost(): ChatUser;
    getChatters(): Map<string, ChatUser>;
    addMessage(message: Message): void;
    addChatUser(chatter: ChatUser): void;
    removeChatUser(chatter: string): void;
}
export default Room;
