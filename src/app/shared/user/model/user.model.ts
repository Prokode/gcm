export class User {

  public username: string;
  public password: string;
  public authToken: any;
  public role: any;

  constructor(username: string = null, password: string = null, authToken: any = null,
   role: string = null) {
    this.username = username;
    this.password = password;
    this.authToken = authToken;
    this.role = role;
  }

}
