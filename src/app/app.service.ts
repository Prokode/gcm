import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {GlobalVariable} from './global';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AppService {
  public nightModeToggleSubject = new Subject<any>();
  public userInfoChange = new Subject<any>();
  constructor(private http: HttpClient) {
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