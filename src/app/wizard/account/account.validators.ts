import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import { GlobalVariable } from '../../global';

@Injectable()
export class AccountValidators {

    constructor(private http: HttpClient) {}

  uniqueUsernameValidator(control: FormControl): Promise<any> | Observable<any> {
    return this.http.get(GlobalVariable.BASE_API_URL + '/logged-out/user/username/check', {
        params: {username: control.value}
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

  samePasswordValidator(control: FormControl) {
      if (control) {
        const parent = control.parent;
        if (parent) {
            if (parent.controls['password'].value === control.value) {
                return;
            } else {
                return { samePassword: true };
            }
        }    
    }
  }

}