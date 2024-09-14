class Message {
    timestamp;
    message;
    username;
    profileImgURL;
    isHost;
    constructor(timestamp, message, username, profileImgURL, isHost) {
        this.timestamp = timestamp;
        this.message = message;
        this.username = username;
        this.profileImgURL = profileImgURL;
        this.isHost = isHost;
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
    getIsHost() {
        return this.isHost;
    }
}
export default Message;
//# sourceMappingURL=Message.js.map