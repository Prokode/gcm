import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import { GlobalVariable } from '../../global';

@Injectable()
export class ConsoleValidators {

  constructor(private http: HttpClient) {}

  uniqueNameValidator(control: FormControl): Promise<any> | Observable<any> {
    if (control.parent) {
      return this.http.get(GlobalVariable.BASE_API_URL + '/logged/console/name/check', {
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

}