import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {GlobalVariable} from '../global';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class TarifService {
  public activationIdShare = new Subject<any>();
  constructor(private http: HttpClient) {
  }

  getTarifs() {
    return this.http.get(GlobalVariable.BASE_API_URL+'/logged/tarif/list')
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

  createTarif(data) {
    return this.http.post(GlobalVariable.BASE_API_URL+'/logged/tarif/create', data)
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

  delateTarif(data) {
    return this.http.put(GlobalVariable.BASE_API_URL+'/logged/tarif/delate', data)
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

  checkTimeExist(params) {
    return this.http.get(GlobalVariable.BASE_API_URL+'/logged/tarif/time/check', {
      params: params
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

  getTarif(id) {
    return this.http.get(GlobalVariable.BASE_API_URL+'/logged/tarif/show', {
      params: {id: id}
    })
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

  updateTarif(data) {
    return this.http.put(GlobalVariable.BASE_API_URL+'/logged/tarif/update', data)
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
