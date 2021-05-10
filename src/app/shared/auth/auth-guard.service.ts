import {ActivatedRouteSnapshot, CanActivate, CanActivateChild,
    Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

import {AuthService} from './auth.service';
import { UserService } from '../user/user.service';
@Injectable()

export class AuthGuard implements CanActivate, CanActivateChild {

 constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
   console.log('auth activate');
   if (!this.authService.isAuthenticated()) {
       this.router.navigate(['/session/signin']);
       return false;
   }
   return true;
  }

 canActivateChild( childRoute: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): boolean {
   console.log('can auth activate child');
   if (!this.authService.isAuthenticated()) {
       this.router.navigate(['/session/signin']);
       return false;
   }
   return true;
 }

}
