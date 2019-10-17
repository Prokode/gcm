import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {GlobalVariable} from '../global';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class DashboardService {
  private subject = new Subject<any>();
  constructor(private http: HttpClient) {
  }

  testApi () {
    return this.http.get(GlobalVariable.BASE_API_URL)
      .map(
        (response: HttpResponse<any>) => {
          return response;
        }
      ).catch(
        (error: HttpErrorResponse) => {
          return Observable.throw({
            code: error.status,
            content: JSON.parse(error.error).message
          });
        }
      );
  }
}
