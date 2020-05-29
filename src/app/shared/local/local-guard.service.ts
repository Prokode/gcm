import {ActivatedRouteSnapshot, CanActivate, CanActivateChild,
    Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import { LocalService } from './local.service';
import {Observable} from 'rxjs/Observable';

@Injectable()

export class LocalGuard implements CanActivate, CanActivateChild {

 constructor(private router: Router, private  localService: LocalService) {}

 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
   console.log('can local activate');
   return this.localService.getLocalConfig().map(
    (res) => {
        console.log('local message');
        console.log(res);
        if (res.message === 'correct') {
            return true;
        } else {
            this.router.navigate(['/', 'local']);
            return false;
            }
        }
    );
        // if (this.localService.localTimeIsCorrect()) {
        //     return true;
        // }  else {
        //     this.router.navigate(['/', 'local']);
        //     return false;
        // }
 }
 canActivateChild( childRoute: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean>| boolean {
    console.log('can local child activate');
    return this.localService.getLocalConfig().map(
        (res) => {
            if (res.message === 'correct') {
                return true;
            } else {
                this.router.navigate(['/', 'local']);
                return false;
            }
        }
    );
 }

}
