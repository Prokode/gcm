import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { ConsoleService } from '../console/console.service';

@Injectable()
export class ConsoleListResolver implements Resolve<any> {

  constructor(private consoleService: ConsoleService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return this.consoleService.getConsoles();

  }

}
