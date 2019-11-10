import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {GlobalVariable} from '../global';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class RaportService {

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
    
}