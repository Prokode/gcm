import {Subject} from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import {User} from './model/user.model';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {GlobalVariable} from '../../global';

@Injectable()
export class UserService {

  public currentUser: Subject<User> = new Subject<User>();
  private currentUserData: User;
  public logOutSubject: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {
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

  getSociety() {
    return this.http.get(GlobalVariable.BASE_API_URL+'/logged-out/user/society')
    .map(
        (response: any) => { return response; }
      ).catch(
        (error: HttpErrorResponse) => {
          console.log(error);
          return Observable.throw({
            code: error.status,
            content: JSON.parse(error.error).message
          });
        }
      );
  }


  getCurrency() {
    return this.http.get(GlobalVariable.BASE_API_URL+'/logged-out/user/currency')
    .map(
        (response: any) => { return response; }
      ).catch(
        (error: HttpErrorResponse) => {
          console.log(error);
          return Observable.throw({
            code: error.status,
            content: JSON.parse(error.error).message
          });
        }
      );
  }

  showUser() {
    return this.http.get(GlobalVariable.BASE_API_URL+'/logged/user/show')
    .map(
        (response: any) => { return response; }
      ).catch(
        (error: HttpErrorResponse) => {
          console.log(error);
          return Observable.throw({
            code: error.status,
            content: JSON.parse(error.error).message
          });
        }
      );
  }

}
