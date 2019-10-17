import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import { GlobalVariable } from '../../global';

@Injectable()
export class TarifValidators {

  constructor(private http: HttpClient) {}

}