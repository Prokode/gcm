import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {GlobalVariable} from '../global';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class UserLoggedService {
  // public activationIdShare = new Subject<any>();
  constructor(private http: HttpClient) {
  }

  createUser(data) {
    return this.http.post(GlobalVariable.BASE_API_URL+'/logged/user/create', data)
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

  getUsers() {
    return this.http.get(GlobalVariable.BASE_API_URL+'/logged/user/list')
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

  getUser(id) {
    return this.http.get(GlobalVariable.BASE_API_URL+'/logged/user/show', {
      params: { id: id }
    })
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
  
  disableUser(data) {
    return this.http.post(GlobalVariable.BASE_API_URL+'/logged/user/disable', data)
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

  activateUser(data) {
    return this.http.post(GlobalVariable.BASE_API_URL+'/logged/user/activate', data)
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

  reInitPassword(data) {
    return this.http.post(GlobalVariable.BASE_API_URL+'/logged/user/password/reinit', data)
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