import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { InformationService } from './information.service';

@Injectable()
export class UserInformationResolver implements Resolve<any> {

  constructor(private informationService: InformationService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return this.informationService.showUser();

  }

}
