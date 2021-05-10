import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {GlobalVariable} from '../global';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class VenteService {
 public venteNotFinishedSubject = new Subject<any>();
  constructor(private http: HttpClient) {
  }

  createVente(data) {
    return this.http.post(GlobalVariable.BASE_API_URL+'/logged/vente/create', data)
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

  getVenteList() {
    return this.http.get(GlobalVariable.BASE_API_URL+'/logged/vente/list')
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

  getVenteNotFinished() {
    return this.http.get(GlobalVariable.BASE_API_URL+'/logged/vente/not_finished')
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

  stopVente(data) {
    return this.http.put(GlobalVariable.BASE_API_URL+'/logged/vente/stop_vente', data)
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
