import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders} from '@angular/common/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

import {GlobalVariable} from '../../global';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

  private loginUrl: string = GlobalVariable.BASE_API_URL + '/auth/signin';

  constructor(private http: HttpClient,
              private userService: UserService) {
    const userDataStored = window.localStorage.getItem('gcmUser');
    if (userDataStored === null) {
      this.userService.currentUser.next(null);
    } else {
      this.userService.currentUser.next(JSON.parse(userDataStored));
    }
  }

  signingUser(credentials) {
    return this.http.post(this.loginUrl, credentials)
      .map(
        (res) => {
          return res;
        }
      )
      .catch(
        (error: HttpErrorResponse) => {
          return Observable.throw({
            code: error.status,
            content: JSON.parse(error.error)
          });
        }
      );
  }

  signOutUser() {
    return this.http.put(GlobalVariable.BASE_API_URL + '/auth/signout',{token: this.userService.getToken()})
      .map(
        (res) => {
          return res;
        }
      )
      .catch(
        (error: HttpErrorResponse) => {
          return Observable.throw({
            code: error.status,
            content: JSON.parse(error.error)
          });
        }
      );
    
  }

  isAuthenticated(): boolean {
    return this.userService.userExists();
  }

}
