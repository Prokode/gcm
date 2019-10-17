import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { TarifService } from './tarif.service';

@Injectable()
export class TarifDetailResolver implements Resolve<any> {

  constructor(private tarifService: TarifService) {
  }
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return this.tarifService.getTarif(route.params['id']);

  }

}
