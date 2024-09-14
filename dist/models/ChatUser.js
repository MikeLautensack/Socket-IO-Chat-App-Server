class ChatUser {
    username;
    profileImg;
    isHost;
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
export default ChatUser;
//# sourceMappingURL=ChatUser.js.map