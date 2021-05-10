import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { AgmCoreModule } from '@agm/core';

import {
  MatSidenavModule,
  MatCardModule,
  MatMenuModule,
  MatCheckboxModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatTabsModule,
  MatListModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatProgressBarModule, 
  MatTableModule, MatTooltipModule, MatDialogModule,
  MatSnackBarModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {BidiModule} from '@angular/cdk/bidi';

import {
  MenuComponent,
  HeaderComponent,
  SidebarComponent,
  NotificationComponent,
  OptionsComponent,
  AdminLayoutComponent,
  AuthLayoutComponent,
  AccordionAnchorDirective,
  AccordionLinkDirective,
  AccordionDirective} from './core';

import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './shared/auth/auth-guard.service';
import { UserService } from './shared/user/user.service';
import { SnackMessageService } from './shared/snack-messages/snack-message.service';
import { SnackMessageComponent } from './shared/snack-messages/snack-message/snack-message.component';
import { HttpInterceptorService } from './shared/auth/http-interceptor.service';
import { ActivationDetailLoaderModule } from './shared/activation/activation-loader.module';
import { ActivationGuard } from './shared/activation/activation-guard.service';
import { StandByComponent } from './stand-by/stand-by.component';
import { StandByModule } from './stand-by/stand-by.module';
import { LocalnDetailLoaderModule } from './shared/local/local.module';
import { LocalGuard } from './shared/local/local-guard.service';
import { ActivationService } from './shared/activation/activation.service';
import { LocalService } from './shared/local/local.service';
import { AppService } from './app.service';
import { UserResolver } from './shared/user/user.resolver';
import { SocietyResolver } from './shared/user/society.resolver';
import { AboutComponent } from './about/about.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
  minScrollbarLength: 20
};



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    NotificationComponent,
    OptionsComponent,
    MenuComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    SnackMessageComponent,
    AboutComponent,
  ],
  imports: [
    // ActivationDetailLoaderModule,
    // LocalnDetailLoaderModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    LoadingBarRouterModule,
    MatSidenavModule,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressBarModule,
    FlexLayoutModule,
    BidiModule,
    AgmCoreModule.forRoot({apiKey: 'YOURAPIKEY'}),
    PerfectScrollbarModule,
    SharedModule,
    MatSnackBarModule,
    MatTableModule,
    StandByModule,
    MatTooltipModule, 
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    SnackMessageService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: HTTP_INTERCEPTORS ,
      useClass: HttpInterceptorService,
      multi: true,
    },
    ActivationGuard,
    LocalGuard,
    SnackMessageService,
    AuthService,
    AuthGuard,
    ActivationService,
    LocalService,
    AppService,
    UserResolver,
    SocietyResolver
  ],
  entryComponents: [
    SnackMessageComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
