import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {GlobalVariable} from '../../global';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class LocalService {
  private subject = new Subject<any>();
  private currentDateTime: any;
  constructor(private http: HttpClient) {
  }

  localTimeIsCorrect(): boolean {
    return true;
    // console.log(this.currentDateTime);
    //   if (this.currentDateTime) {
    //     return this.currentDateTime.message === 'correct' ? true : false;
    //   } else {
    //     return false;
    //   }
    // return new Observable<boolean>((observer) => {
    //  return new Promise((resolve, reject) => {
    //     this.getLocalConfig().subscribe(
    //       (response: any) => {
    //         resolve(response);
    //       }, (error: HttpErrorResponse) => {
    //         console.log(error);
    //         alert('SERVER CONNEXION ERROR');
    //       }
    //     );
    //   }).then(
    //     (res: any) => {
    //       const localcheck = res.message === 'correct' ? true : false;
    //       observer.next(localcheck);
    //       observer.complete();
    //     }
    //   )
    // });
  }

  loadLocalConfigData() {
        return new Promise((resolve, reject) => {
            this.getLocalConfig().subscribe(
              (response: any) => {
                resolve();
              }, (error: HttpErrorResponse) => {
                console.log(error);
                alert('SERVER CONNEXION ERROR');
              }
            );
          });
  }

  getLocalConfig() {
        return this.http.get(GlobalVariable.BASE_API_URL+'/logged-out/local/configs')
        .map(
            (response: any) => {
                this.currentDateTime = response;
                window.localStorage.setItem('currentDateTime', JSON.stringify(response));
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