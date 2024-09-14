"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChatUser {
    constructor(username, profileImg, isHost) {
        this.username = username;
        this.profileImg = profileImg;
        this.isHost = isHost;
    }
    getUsername() {
        return this.username;
    }
    getProfileImg() {
        return this.profileImg;
    }
    getIsHost() {
        return this.isHost;
    }
}
exports.default = ChatUser;
