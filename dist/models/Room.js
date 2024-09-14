"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Room {
    constructor(name, host) {
        this.chatters = new Map();
        this.name = name;
        this.host = host;
        this.messages = [];
        this.chatters.set(host.getUsername(), host);
    }
    getName() {
        return this.name;
    }
    getMessages() {
        return this.messages;
    }
    getHost() {
        return this.host;
    }
    getChatters() {
        return this.chatters;
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
    addChatUser(chatter) {
        if (this.chatters.size < 16) {
            this.chatters.set(chatter.getUsername(), chatter);
        }
    }
    removeChatUser(chatter) {
        this.chatters.delete(chatter);
    }
}
exports.default = Room;
