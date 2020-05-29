import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { LicenceService } from './licence.service';

@Injectable()
export class LicenceResolver implements Resolve<any> {

  constructor(private licenceService: LicenceService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return this.licenceService.getLicence();

  }

  

}
