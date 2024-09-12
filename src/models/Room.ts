import Message from "./Message";

class Room {
  private name: string;
  private messages: Message[];

  constructor(name: string) {
    this.name = name;
    this.messages = [];
  }

  public getName(): string {
    return this.name;
  }

  public getMessages(): Message[] {
    return this.messages;
  }

  public addMessage(message: Message): void {
    if (this.messages.length < 50) {
      this.messages.push(message);
    } else {
      this.messages.shift();
      this.messages.push(message);
    }
  }
}

export default Room;
