import { genId } from "../utils/utils";
import ChatUser from "./ChatUser";
import Message from "./Message";
import Room from "./Room";

class StateMachine {
  private static instance: StateMachine | undefined = undefined;
  private id: number;
  private rooms: Map<string, Room> = new Map();

  private constructor() {
    this.id = genId();
  }

  public static getInstance(): StateMachine {
    if (!StateMachine.instance) {
      StateMachine.instance = new StateMachine();
    }
    return StateMachine.instance;
  }

  public getId(): number {
    return this.id;
  }

  public getRooms(): Map<string, Room> {
    return this.rooms;
  }

  public getRoom(roomname: string): Room {
    const room = this.rooms.get(roomname);
    return room!;
  }

  public getRoomMessages(roomname: string): Message[] {
    const room = this.rooms.get(roomname);
    return room ? room.getMessages() : [];
  }

  public getRoomNames(): string[] {
    return Array.from(this.rooms.keys());
  }

  public addRoom(roomname: string, host: ChatUser): void {
    if (!this.rooms.has(roomname)) {
      this.rooms.set(roomname, new Room(roomname, host));
    }
  }

  public addMessageToRoom(
    roomname: string,
    timestamp: Date,
    message: string,
    username: string,
    profileImgURL: string,
    isHost: boolean
  ): void {
    let room = this.rooms.get(roomname);
    const newMessage = new Message(
      timestamp,
      message,
      username,
      profileImgURL,
      isHost
    );
    room && room.addMessage(newMessage);
  }

  public addChatUserToRoom(roomname: string, chatuser: ChatUser): void {
    let room = this.rooms.get(roomname);
    room?.addChatUser(chatuser);
  }

  public isUserHost(roomname: string, username: string): boolean {
    let room = this.rooms.get(roomname);
    let host = room?.getHost();
    if (host?.getUsername() === username) {
      return true;
    } else {
      return false;
    }
  }
}

export default StateMachine;
