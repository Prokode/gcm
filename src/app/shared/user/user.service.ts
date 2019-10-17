import {Subject} from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import {User} from './model/user.model';


@Injectable()
export class UserService {

  public currentUser: Subject<User> = new Subject<User>();
  private currentUserData: User;

  constructor() {
    this.currentUser.subscribe(
      (user) => {
        if (user) {
          this.currentUserData = user;
        }
      }
    );
  }
  userExists(): boolean {
    const currentUser: any = window.localStorage.getItem('gcmUser');
    return (currentUser !== null);
  }
  getToken(): string {
    const currentUser: any = JSON.parse(window.localStorage.getItem('gcmUser'));
    return currentUser.authToken;
  }
  getCurrentUser(): any {
    return Object.assign({}, this.currentUserData);
  }
}
