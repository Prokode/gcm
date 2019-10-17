import {ActivatedRouteSnapshot, CanActivate, CanActivateChild,
    Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import { ActivationService } from './activation.service';
@Injectable()

export class ActivationGuard implements CanActivate, CanActivateChild {

 constructor(private router: Router, private activationService: ActivationService) {}

 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
   console.log('can activation activate');
      if (this.activationService.isActivated()) {
        return true;
      } else if (this.activationService.isExpired()) {
        this.router.navigate(['/', 'reactivation']);
        return false;
      } else {
        this.router.navigate(['/', 'wizard']);
        return false;
      }
 }
 canActivateChild( childRoute: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): boolean {
    console.log('can activation activate');
    if (this.activationService.isActivated()) {
      return true;
    } else if (this.activationService.isExpired()) {
      this.router.navigate(['/', 'reactivation']);
      return false;
    } else {
        this.router.navigate(['/', 'wizard']);
        return false;
    }
 }

}
