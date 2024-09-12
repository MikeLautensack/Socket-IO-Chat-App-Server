class Room {
    name;
    messages;
    constructor(name) {
        this.name = name;
        this.messages = [];
    }
    getName() {
        return this.name;
    }
    getMessages() {
        return this.messages;
    }
    addMessage(message) {
        if (this.messages.length < 50) {
            this.messages.push(message);
        }
        else {
            this.messages.shift();
            this.messages.push(message);
        }
    }
}
export default Room;
//# sourceMappingURL=Room.js.map