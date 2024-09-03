import { Component, ElementRef, NgZone, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

import { TranslateService } from '@ngx-translate/core';

import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import {Observable} from 'rxjs/Observable';
import { StandByService } from '../../stand-by/stand-by.service';
import { AuthService } from '../../shared/auth/auth.service';
import { UserService } from '../../shared/user/user.service';
import { AppService } from '../../app.service';

const electron = window.require('electron');

const SMALL_WIDTH_BREAKPOINT = 960;

@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent implements OnInit, OnDestroy {

  private _router: Subscription;

  mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  url: string;
  sidePanelOpened;
  options = {
    collapsed: false,
    compact: false,
    boxed: false,
    dark: false,
    dir: 'ltr'
  };

  @ViewChild('sidemenu') sidemenu;
  @ViewChild(PerfectScrollbarDirective) directiveScroll: PerfectScrollbarDirective;



  public config: PerfectScrollbarConfigInterface = {};
  logoutTimeout: number = 3; // in minutes
  subscription: any;
  showRefreshSession : Boolean = false;
  standByType = 'verfiy_password';
  night_mode = false;
  user: any;
  society: any;

  appVersion: any = '';

  

  constructor(
    private standByService: StandByService,
    private _element: ElementRef,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    zone: NgZone,
    private route: ActivatedRoute,  
    private appService: AppService ) {

    this.mediaMatcher.addListener( (mql: any) => zone.run(() => {
      this.mediaMatcher = mql;
    }));
    this.initTimer(this.logoutTimeout); 
    
    this.standByService.standBySubject.asObservable().subscribe(
      (res) => {
        this.showRefreshSession = res;
      }
    );

    this.userService.logOutSubject.asObservable().subscribe(
      (res) => {
        console.log(res);
        if (res) {
          this.logout();
        }
      }
    ); 

    this.appService.nightModeToggleSubject.asObservable().subscribe(
      (res) => {
        this.night_mode = res;
      }
    );

    this.appService.userInfoChange.asObservable().subscribe(
      (res) => {
        if (res) {
          this.getUser();
          this.getUserSociety();
        }
      }
    );

    try {
      this.appVersion = electron.remote.app.getVersion();
    } catch (e) {
      console.log("Error getting version");
    }

    
    
  }

  ngOnInit(): void {

    this.url = this.router.url;

    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      document.querySelector('.app-inner > .mat-drawer-content > div').scrollTop = 0;
      this.url = event.url;
      this.runOnRouteChange();
    });

    this.route.data.subscribe(
      (data: any) => {
        this.user = data['user'];
        this.society = data['society'].society;
        window.localStorage.setItem('appCurrency', data['currency'].currency);
      }
    );
    
  }

  ngOnDestroy(): void  {
    this._router.unsubscribe();
  }

  @HostListener('mouseover', ['$event']) onDocummentClick(e: KeyboardEvent) {
    e.preventDefault();
    this.clearTimer();
    this.initTimer(this.logoutTimeout);
  }
  clearTimer () {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  initTimer (endTime: number) {
    const interval = 1000;
    const duration = endTime * 60;

    this.subscription = Observable.timer(0, interval)
      .take(duration)
      .subscribe(value => {},
        err => { console.log(err); },
        () => {
          if (!this.showRefreshSession) {
            this.standByType = 'verfiy_password';
            this.showRefreshSession = true;
          }
        });
  }

  runOnRouteChange(): void {
    if (this.isOver()) {
      this.sidemenu.close();
    }

    this.updatePS();
  }

  receiveOptions($event): void {
    this.options = $event;
  }

  isOver(): boolean {
    if ( this.url === '/maps/leaflet' ||
      this.url === '/taskboard') {
      return true;
    } else {
      return this.mediaMatcher.matches;
    }
  }

  menuMouseOver(): void {
    if (this.mediaMatcher.matches && this.options.collapsed) {
      this.sidemenu.mode = 'over';
    }
  }

  menuMouseOut(): void {
    if (this.mediaMatcher.matches && this.options.collapsed) {
      this.sidemenu.mode = 'side';
    }
  }

  updatePS(): void  {
    if (!this.mediaMatcher.matches && !this.options.compact) {
      setTimeout(() => {
        this.directiveScroll.update();
      }, 350);
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
    );
  }

  getUser() {
    this.appService.showUser().subscribe(
      (res) => {
        this.user = res;
      }
    );
  }

  getUserSociety() {
    this.appService.getSociety().subscribe(
      (res: any) => {
        this.society = res.society;
      }
    )
  }
  
}
