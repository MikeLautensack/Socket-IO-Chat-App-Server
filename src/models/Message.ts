class Message {
  private timestamp: Date;
  private message: string;
  private username: string;
  private profileImgURL: string;
  private isHost: boolean;

  constructor(
    timestamp: Date,
    message: string,
    username: string,
    profileImgURL: string,
    isHost: boolean
  ) {
    this.timestamp = timestamp;
    this.message = message;
    this.username = username;
    this.profileImgURL = profileImgURL;
    this.isHost = isHost;
  }

  public getTimestamp(): Date {
    return this.timestamp;
  }

  public getMessage(): string {
    return this.message;
  }

  public getUsername(): string {
    return this.username;
  }

  public getProfileImgURL(): string {
    return this.profileImgURL;
  }

  public getIsHost(): boolean {
    return this.isHost;
  }
}

export default Message;
