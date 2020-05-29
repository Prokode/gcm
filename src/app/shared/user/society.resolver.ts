import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { UserService } from './user.service';

@Injectable()
export class SocietyResolver implements Resolve<any> {

  constructor(private userService: UserService ) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return this.userService.getSociety();

  }

}
