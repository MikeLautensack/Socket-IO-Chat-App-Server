import { genId } from "../utils/utils";
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

  public getRoomMessages(roomname: string): Message[] | void {
    this.rooms.forEach((room, key) => {
      if (room.getName() === roomname) {
        return room.getMessages();
      }
    });
  }

  public getRoomNames(): string[] {
    let names: string[] = [];

    this.rooms.forEach((value, key) => {
      names.push(value.getName());
    });
    return names;
  }

  public addRoom(roomname: string): void {
    this.rooms.set(roomname, new Room(roomname));
  }

  public addMessageToRoom(
    roomname: string,
    timestamp: Date,
    message: string,
    username: string,
    profileImgURL: string
  ): void {
    this.rooms.forEach((room, key) => {
      if (room.getName() === roomname) {
        const newMessage = new Message(
          timestamp,
          message,
          username,
          profileImgURL
        );
        room.addMessage(newMessage);
      }
    });
  }
}

export default StateMachine;
