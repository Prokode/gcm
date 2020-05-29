import {ActivatedRouteSnapshot, CanActivate, CanActivateChild,
    Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import { ActivationService } from './activation.service';
import {Observable} from 'rxjs/Observable';

@Injectable()

export class ActivationGuard implements CanActivate, CanActivateChild {

 constructor(private router: Router, private activationService: ActivationService) {}

 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<boolean>| boolean {
   console.log('can activation activate');
    return this.activationService.getActivation().map(
      (res: any) => {
        console.log('activ message')
        if (res.message === 'activated') {
          return true;
        } else if (res.message === 'activation exprired') {
          this.router.navigate(['/', 'reactivation']);
          return false;
        } else {
          this.router.navigate(['/', 'wizard']);
          return false;
        }
      }
    );
      // if (this.activationService.isActivated()) {
      //   return true;
      // } else if (this.activationService.isExpired()) {
      //   this.router.navigate(['/', 'reactivation']);
      //   return false;
      // } else {
      //   this.router.navigate(['/', 'wizard']);
      //   return false;
      // }
 }
 canActivateChild( childRoute: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot):   Observable<boolean>| boolean {
    console.log('can activation activate');

    return this.activationService.getActivation().map(
      (res: any) => {
       if (res.message === 'activated') {
         return true;
       } else if (res.message === 'activation exprired') {
         this.router.navigate(['/', 'reactivation']);
         return false;
       } else {
         this.router.navigate(['/', 'wizard']);
         return false;
       }
      }
    );

    // if (this.activationService.isActivated()) {
    //   return true;
    // } else if (this.activationService.isExpired()) {
    //   this.router.navigate(['/', 'reactivation']);
    //   return false;
    // } else {
    //     this.router.navigate(['/', 'wizard']);
    //     return false;
    // }
 }

}
