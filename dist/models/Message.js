class Message {
    timestamp;
    message;
    username;
    profileImgURL;
    constructor(timestamp, message, username, profileImgURL) {
        this.timestamp = timestamp;
        this.message = message;
        this.username = username;
        this.profileImgURL = profileImgURL;
    }
    getTimestamp() {
        return this.timestamp;
    }
    getMessage() {
        return this.message;
    }
    getUsername() {
        return this.username;
    }
    getProfileImgURL() {
        return this.profileImgURL;
    }
}
export default Message;
//# sourceMappingURL=Message.js.map