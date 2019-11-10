import { Component, EventEmitter, Output } from '@angular/core';

import * as screenfull from 'screenfull';
import { AuthService } from '../../shared/auth/auth.service';
import { UserService } from '../../shared/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleNotificationSidenav = new EventEmitter<void>();

  constructor(private authService: AuthService,
    private router: Router,
     private userService: UserService) {
  }

  fullScreenToggle(): void {
    if (screenfull.enabled) {
      screenfull.toggle();
    }
  }

  logout() {
    this.authService.signOutUser().subscribe(
      (res) => {
        if (res.message === 'success') {
          this.userService.currentUser.next(null);
          window.localStorage.clear();
          this.router.navigate(['/session/signin']);
        }
      }
    )
  }
}
