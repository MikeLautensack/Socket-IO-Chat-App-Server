declare class Message {
    private timestamp;
    private message;
    private username;
    private profileImgURL;
    private isHost;
    constructor(timestamp: Date, message: string, username: string, profileImgURL: string, isHost: boolean);
    getTimestamp(): Date;
    getMessage(): string;
    getUsername(): string;
    getProfileImgURL(): string;
    getIsHost(): boolean;
}
export default Message;
