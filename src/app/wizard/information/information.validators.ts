import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import { GlobalVariable } from '../../global';

@Injectable()
export class InformationValidators {

  constructor(private http: HttpClient) {}

  uniquePhoneValidator(control: FormControl): Promise<any> | Observable<any> {
   if (control.parent) {
    return this.http.get(GlobalVariable.BASE_ONLINE_API_URL + '/checkUniquePhone.php', {
        params: {phone: control.value, code: control.parent.controls['country'].value.code }
    })
      .map(
        (response: any) => {
            console.log(response);
          if (response) {
            if (response.unused) {
              return false;
            } else if (!response.unused) {
              return { phoneUnique: true };
            }
          } else {
            return;
          }
        }
      );
   }
  }

}