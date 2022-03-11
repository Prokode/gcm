import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { BoardService } from './board.service';

@Injectable()
export class BoardDetailResolver implements Resolve<any> {

  constructor(private boardService: BoardService ) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return this.boardService.getConsole(route.params['id']);

  }

}
