import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { PosteService } from './poste.service';

@Injectable()
export class PosteListResolver implements Resolve<any> {

  constructor(private posteService: PosteService ) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return this.posteService.getPostes();

  }

}
