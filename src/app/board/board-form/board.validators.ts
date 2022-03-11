import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import { GlobalVariable } from '../../global';

@Injectable()
export class BoardValidators {

  constructor(private http: HttpClient) {}

  uniqueNameValidator(control: FormControl): Promise<any> | Observable<any> {
    if (control.parent) {
      return this.http.get(GlobalVariable.BASE_API_URL + '/logged/board/name/check', {
          params: {name: control.value}
      })
        .map(
          (response: any) => {
            if (response) {
              if (response.unused) {
                return false;
              } else if (!response.unused) {
                if (control.parent.controls['_id'].value === response.id) {
                  return false;
                }
                return { nameUnique: true };
              }
            } else {
              return;
            }
          }
        );
          
    }    
  }

  uniqueComValidator(control: FormControl): Promise<any> | Observable<any> {
    if (control.parent) {
      return this.http.get(GlobalVariable.BASE_API_URL + '/logged/board/com/check', {
          params: {com: control.value}
      })
        .map(
          (response: any) => {
            if (response) {
              if (response.unused) {
                return false;
              } else if (!response.unused) {
                if (control.parent.controls['_id'].value === response.id) {
                  return false;
                }
                return { comUnique: true };
              }
            } else {
              return;
            }
          }
        );
          
    }    
  }

  uniqueIpValidator(control: FormControl): Promise<any> | Observable<any> {
    if (control.parent) {
      return this.http.get(GlobalVariable.BASE_API_URL + '/logged/board/ip/check', {
          params: {ip: control.value}
      })
        .map(
          (response: any) => {
            if (response) {
              if (response.unused) {
                return false;
              } else if (!response.unused) {
                if (control.parent.controls['_id'].value === response.id) {
                  return false;
                }
                return { ipUnique: true };
              }
            } else {
              return;
            }
          }
        );
          
    }    
  }

}