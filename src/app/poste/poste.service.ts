import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {GlobalVariable} from '../global';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class PosteService {
  public activationIdShare = new Subject<any>();
  constructor(private http: HttpClient) {
  }

  getPostes() {
    return this.http.get(GlobalVariable.BASE_API_URL+'/logged/poste/list')
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

  getPoste(id) {
    return this.http.get(GlobalVariable.BASE_API_URL+'/logged/poste/show', {
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

  getPosteActivationDetails() {
    return this.http.get(GlobalVariable.BASE_API_URL+'/logged/posteact/detail')
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
  postOnlinePosteActivation(data) {
    return this.http.post(GlobalVariable.BASE_ONLINE_API_URL +'/postPosteActivation.php', data)
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

   postLocalPosteActivation(data) {
    return this.http.post(GlobalVariable.BASE_API_URL+'/logged/posteact/', data)
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

  getNewPosteName() {
    return this.http.get(GlobalVariable.BASE_API_URL+'/logged/poste/name/resolve')
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

    createPoste(data) {
      return this.http.post(GlobalVariable.BASE_API_URL+'/logged/poste/create', data)
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

    checkPosteLimitation() {
      return this.http.get(GlobalVariable.BASE_API_URL+'/logged/poste/check/limitation')
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

    updatePoste(data) {
      return this.http.put(GlobalVariable.BASE_API_URL+'/logged/poste/update', data)
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

    getPostesTarifs() {
      return this.http.get(GlobalVariable.BASE_API_URL+'/logged/poste/list/tarifs')
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

    disablePoste(data) {
      return this.http.put(GlobalVariable.BASE_API_URL+'/logged/poste/disable', data)
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