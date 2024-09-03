import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {GlobalVariable} from '../global';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class WizardService {
  public activationIdShare = new Subject<any>();
  public rootPasswordShare = new Subject<any>();
  public societyShare = new Subject<any>();
  public currencyShare = new Subject<any>();
  constructor(private http: HttpClient) {
  }

  getMacAddress() {
    return this.http.get(GlobalVariable.BASE_API_URL+'/logged-out/mac/')
    .map(
        (response: any) => {  return response; }
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

  registerUser(data) {
    return this.http.post(GlobalVariable.BASE_ONLINE_API_URL+'/registerUser.php', data)
      .map(
        (response: any) => {  return response; }
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

   createAdminAccount(data) {
    return this.http.post(GlobalVariable.BASE_API_URL+'/logged-out/user/create', data)
      .map(
        (response: any) => {  return response; }
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
  
  checkForUniqueUsername(value) {
      return this.http.get(GlobalVariable.BASE_API_URL + '/logged-out/user/username/check', {
        params: {username: value}
      })
      .map(
        (response: any) => {
            console.log(response);
          if (response) {
            if (response.unused) {
              return false;
            } else if (!response.unused) {
              return { usernameUnique: true };
            }
          } else {
            return;
          }
        }
      );
    }
    
    recoverUser(data) {
      return this.http.post(GlobalVariable.BASE_ONLINE_API_URL+'/recoverUser.php', data)
        .map(
          (response: any) => {  return response; }
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

    confirmUserRecovered(data) {
      return this.http.post(GlobalVariable.BASE_ONLINE_API_URL+'/confirmUserRecovered.php', data)
      .map(
        (response: any) => {  return response; }
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

    getLocalDateTime() {
      /* We use http://worldclockapi.com/ api to get user correctly date */
      return this.http.get('http://worldclockapi.com/api/json/utc/now')
        .map(
          (response: HttpResponse<any>) => {
            return response;
          }
        ).catch(
          (error: HttpErrorResponse) => {
            return Observable.throw({
              error: error
            });
          }
        );
    }

    postLocalDateTime(data) {
      return this.http.post(GlobalVariable.BASE_API_URL + '/logged-out/local/currentDateTime', data)
      .map(
        (response: any) => {  return response; }
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

    restoreConfigs(data) {
      return this.http.post(GlobalVariable.BASE_API_URL + '/logged-out/configs/restore', data)
      .map(
        (response: any) => {  return response; }
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
