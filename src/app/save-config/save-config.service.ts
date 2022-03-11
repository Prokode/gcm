import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {GlobalVariable} from '../global';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SaveConfigService {
  public activationIdShare = new Subject<any>();
  constructor(private http: HttpClient) {   }

  saveConfigs(data) {
    return this.http.post(GlobalVariable.BASE_ONLINE_API_URL +'/saveConfigs.php', data)
    .map(
        (response: any) => {  return response; }
      ).catch(
        (error: HttpErrorResponse) => {
          console.log(error);
          return Observable.throw({
            code: error.error.status
          });
        }
      );
  }

  loadConfigs(params) {
    return this.http.get(GlobalVariable.BASE_API_URL+'/logged/configs/', {
      params: params
    })
    .map(
        (response: any) => {  return response; }
      ).catch(
        (error: HttpErrorResponse) => {
          console.log(error);
          return Observable.throw({
            code: error.error.status
          });
        }
      );
  }


 
}