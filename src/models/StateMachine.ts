import { genId } from "../utils/utils";
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
}

export default StateMachine;
