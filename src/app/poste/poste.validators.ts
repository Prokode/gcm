import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import { GlobalVariable } from '../global';

@Injectable()
export class PosteValidators {

  constructor(private http: HttpClient) {}

  arduinoPinValidator(control: FormControl): Promise<any> | Observable<any> {
    if (control.parent) {
      return this.http.get(GlobalVariable.BASE_API_URL + '/logged/poste/arduino/pin/validate', {
        params: {arduino_pin: control.value, board_id: control.parent.value.board_id}
      }).map(
          (response: any) => {
            if (response) {
              if (response.isValid) {
                return false;
              } else if (!response.isValid) {
                if (response.used_pin_poste_id === control.parent.controls['_id'].value) {
                  return false;
                }
                return { pinNotValid: true };
              }
            } else {
              return;
            }
          }
        );
      }
  }

}