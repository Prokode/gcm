export class User {

  public username: string;
  public password: string;
  public authToken: any;

  constructor(username: string = null, password: string = null, authToken: any = null,
    ) {
    this.username = username;
    this.password = password;
    this.authToken = authToken;
  }

}
