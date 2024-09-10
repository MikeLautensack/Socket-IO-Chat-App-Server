class Message {
  private timestamp: Date;
  private message: string;
  private username: string;
  private profileImgURL: string;

  constructor(
    timestamp: Date,
    message: string,
    username: string,
    profileImgURL: string
  ) {
    this.timestamp = timestamp;
    this.message = message;
    this.username = username;
    this.profileImgURL = profileImgURL;
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
}
