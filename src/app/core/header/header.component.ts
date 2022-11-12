import { Component, EventEmitter, Output, Input } from '@angular/core';

import * as screenfull from 'screenfull';
import { AuthService } from '../../shared/auth/auth.service';
import { UserService } from '../../shared/user/user.service';
import { Router } from '@angular/router';
import { StandByService } from '../../stand-by/stand-by.service';
import { AppService } from '../../app.service';
import { InformationService } from '../../information/information.service';
import { IpcService } from '../../shared/ipc/ipc.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleNotificationSidenav = new EventEmitter<void>();
  @Input() society: any = null;
  
  constructor(private authService: AuthService,
    private router: Router,
    private appService: AppService,
    private standByService: StandByService,
    private readonly _ipc: IpcService,
    private userService: UserService) {
      // this.getUserSociety();
      this.appService.userInfoChange.asObservable().subscribe(
        (res) => {
          if (res) {
            this.getUserSociety();
          }
        }
      )
  }

  fullScreenToggle(): void {
    if (screenfull.enabled) {
      screenfull.toggle();
    }
  }

  logout() {
    this.userService.logOutSubject.next(true);
  }

  placeInStandBy() {
    this.standByService.standBySubject.next(true);
  }

  nightModeToggle(e:any) {
    console.log(e);
    this.appService.nightModeToggleSubject.next(e.checked);
  }

  getUserSociety() {
    this.appService.getSociety().subscribe(
      (res: any) => {
        this.society = res.society;
      }
    )
  }

  restart() {
    this._ipc.send('reload_app');
  }

}
