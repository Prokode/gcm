import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { VenteService } from './vente.service';

@Injectable()
export class VenteListResolver implements Resolve<any> {

  constructor(private venteService: VenteService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return this.venteService.getVenteList();

  }

}
