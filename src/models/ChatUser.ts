class ChatUser {
  private username: string;
  private profileImg: string;
  private isHost: boolean;

  constructor(username: string, profileImg: string, isHost: boolean) {
    this.username = username;
    this.profileImg = profileImg;
    this.isHost = isHost;
  }

  public getUsername(): string {
    return this.username;
  }

  public getProfileImg(): string {
    return this.profileImg;
  }

  public getIsHost(): boolean {
    return this.isHost;
  }
}

export default ChatUser;
