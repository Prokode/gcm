import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SnackMessageService } from './shared/snack-messages/snack-message.service';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { SnackMessageComponent } from './shared/snack-messages/snack-message/snack-message.component';
import { SnackMessage } from './shared/snack-messages/snack-message.model';
import { UserService } from './shared/user/user.service';
import { AuthService } from './shared/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  private snackBarConfig: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  };
  constructor(translate: TranslateService,  private snackBar: MatSnackBar, private authService: AuthService,
     private snackMessageService: SnackMessageService, private userService: UserService, private router: Router ) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    this.snackMessageService.newMessage.subscribe(
      (snackMessage: SnackMessage) => {
        this.snackBarConfig.data = snackMessage;
        this.snackBarConfig.extraClasses = [snackMessage.type];
        this.snackBar.openFromComponent(SnackMessageComponent, this.snackBarConfig);
      }
    );

    this.userService.currentUser.subscribe(
      (res) => {
        if (res === null) {
          this.authService.signOutUser().subscribe(
            (res) => {
              window.localStorage.removeItem('gcmUser');
              this.router.navigate(['/session/signin'])
            }
          );
        }
      }
    )
  }

  
}
