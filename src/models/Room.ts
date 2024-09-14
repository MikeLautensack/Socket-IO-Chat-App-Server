import { userInfo } from "node:os";
import ChatUser from "./ChatUser";
import Message from "./Message";

class Room {
  private name: string;
  private messages: Message[];
  private host: ChatUser;
  private chatters: Map<string, ChatUser> = new Map();

  constructor(name: string, host: ChatUser) {
    this.name = name;
    this.host = host;
    this.messages = [];
    this.chatters.set(host.getUsername(), host);
  }

  public getName(): string {
    return this.name;
  }

  public getMessages(): Message[] {
    return this.messages;
  }

  public getHost(): ChatUser {
    return this.host;
  }

  public getChatters(): Map<string, ChatUser> {
    return this.chatters;
  }

  public addMessage(message: Message): void {
    if (this.messages.length < 50) {
      this.messages.push(message);
    } else {
      this.messages.shift();
      this.messages.push(message);
    }
  }

  public addChatUser(chatter: ChatUser): void {
    if (this.chatters.size < 16) {
      this.chatters.set(chatter.getUsername(), chatter);
    }
  }

  public removeChatUser(chatter: string): void {
    this.chatters.delete(chatter);
  }
}

export default Room;
