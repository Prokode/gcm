import {Injectable} from '@angular/core';
import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpResponse,
  HttpHeaders
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {UserService} from '../user/user.service';
import {SnackMessageService} from '../snack-messages/snack-message.service';
import {SnackMessage} from '../snack-messages/snack-message.model';
import {GlobalVariable} from '../../global';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private userService: UserService,
    private snackMessageService: SnackMessageService) { console.log('Request is intercepted successfully.'); }
    requestMessageTreat(message) {
      let msg = null;
      // console.log('result treat');
      // console.log(message);
      switch (message) {
        case 'invalid_token':
          msg = 'VOTRE CONNEXION A EXPIRE VOUS DEVEZ VOUS RECONNECTEZ';
          this.snackMessageService.newMessage.next(new SnackMessage('danger', msg));
          this.userService.currentUser.next(null);
          break;
        case 'error_app':
          msg = 'RECHARGER TOUTE L\'APPLICATION OU RECONNECTEZ-VOUS';
          this.snackMessageService.newMessage.next(new SnackMessage('danger', msg));
          break;
        case 'error':
          msg = 'UNE ERREUR S\'EST PRODUITE, REESSEYEZ.';
          this.snackMessageService.newMessage.next(new SnackMessage('danger', msg));
          break;
         /*
        case 'success':
          msg = 'SUCCES';
          this.snackMessageService.newMessage.next(new SnackMessage('success', msg));
          break;
         */
      }
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('Intercepeted');
    if (this.userService.userExists() && req.url.includes(GlobalVariable.BASE_API_URL)) {

      const token: string = this.userService.getToken();
      // console.log(token);
      const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token).set('X-App-Id', GlobalVariable.APP_ID)});
      // console.log(authReq);
      return next.handle(authReq).catch(
        (err: any, caught: Observable<any>) => {
          // console.log(err);
          if (err.status === 0) {
            const message = 'ERREUR DE CONNEXION AU SERVEUR';
            this.snackMessageService.newMessage.next(new SnackMessage('danger', message));
            err.error.message = message;
            err.error = JSON.stringify(err.error);
          } else if (err.status === 403) {
            if (err.statusText === 'invalid_token') {
              this.userService.currentUser.next(null);
            }
          }
          return Observable.throw(err);
        }
      ).do((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
            this.requestMessageTreat(event.body.message);
        }
      }, (err: any) => {
          if (err.error === 'Unauthorized') {
            const msg = 'VOTRE CONNEXION A EXPIRE, VOUS DEVEZ VOUS RECONNECTER.';
            this.snackMessageService.newMessage.next(new SnackMessage('danger', msg));
            this.userService.currentUser.next(null);
            
          }
      });
    } else {
      const appReq = req.clone({
       headers: req.headers.set('X-App-Id', GlobalVariable.APP_ID)
      });
      return next.handle(appReq).catch(
        (err: any, caught: Observable<any>) => {
        //  console.log(err);
          if (err.status === 0) {
            const message = 'ERREUR DE CONNEXION AU SERVEUR';
            this.snackMessageService.newMessage.next(new SnackMessage('danger', message));
            err.error.message = message;
            err.error = JSON.stringify(err.error);
          }
          return Observable.throw(err);
        }
      ).do((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.requestMessageTreat(event.body.message);
        }
      }, (err: any) => {
          if (err instanceof HttpErrorResponse) {
            return Observable.throw(err);
          }
      });
    }

  }

}
