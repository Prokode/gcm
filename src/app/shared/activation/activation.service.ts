import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {GlobalVariable} from '../../global';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ActivationService {
  private subject = new Subject<any>();
  private activationDatail: any;
  constructor(private http: HttpClient) {
  }
  isActivated(): boolean {
    console.log(this.activationDatail);
      if (this.activationDatail) {
        return this.activationDatail.message === 'activated' ? true : false;
      } else {
        return false;
      }
  }

  isExpired(): boolean {
    console.log(this.activationDatail);
    if (this.activationDatail) {
      return this.activationDatail.message === 'activation exprired' ? true : false;
    } else {
      return false;
    }
  }
  loadActivationData() {
        return new Promise((resolve, reject) => {
            this.getActivation().subscribe(
              (response: any) => {
                resolve();
              }, (error: HttpErrorResponse) => {
                console.log(error);
                alert('SERVER CONNEXION ERROR');
              }
            );
          });
  }
  getActivation() {
    return this.http.get(GlobalVariable.BASE_API_URL+'/logged-out/activation/')
    .map(
        (response: any) => {
          this.activationDatail = response;
          window.localStorage.setItem('activationDatail', JSON.stringify(response));
          return response;
        }
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

  postActivation(data) {
    return this.http.post(GlobalVariable.BASE_ONLINE_API_URL+'/activation.php', data)
    .map(
        (response: any) => {
          return response;
        }
      ).catch(
        (error: HttpErrorResponse) => {
          console.log(error);
          return Observable.throw({
            code: error.status,
            content: error.error
          });
        }
      );
  }

  registerLocalActivation(data) {
    return this.http.post(GlobalVariable.BASE_API_URL+'/logged-out/activation/create', data)
    .map(
        (response: any) => {
          return response;
        }
      ).catch(
        (error: HttpErrorResponse) => {
          console.log(error);
          return Observable.throw({
            code: error.status,
            content: error.error
          });
        }
      );
  }

 updateActivation(data) {
    return this.http.post(GlobalVariable.BASE_ONLINE_API_URL+'/updateActivation.php', data)
    .map(
        (response: any) => {
          return response;
        }
      ).catch(
        (error: HttpErrorResponse) => {
          console.log(error);
          return Observable.throw({
            code: error.status,
            content: error.error
          });
        }
      );
  }
}
