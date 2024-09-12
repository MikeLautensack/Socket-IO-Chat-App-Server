declare class Message {
    private timestamp;
    private message;
    private username;
    private profileImgURL;
    constructor(timestamp: Date, message: string, username: string, profileImgURL: string);
    getTimestamp(): Date;
    getMessage(): string;
    getUsername(): string;
    getProfileImgURL(): string;
}
export default Message;
//# sourceMappingURL=Message.d.ts.map