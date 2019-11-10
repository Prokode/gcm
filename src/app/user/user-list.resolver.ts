import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { UserLoggedService } from './user-logged.service';

@Injectable()
export class UserListResolver implements Resolve<any> {

  constructor(private userLoggedService: UserLoggedService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return this.userLoggedService.getUsers();

  }

}