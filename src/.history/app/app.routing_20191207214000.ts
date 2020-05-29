import { Routes } from '@angular/router';

import { AdminLayoutComponent, AuthLayoutComponent } from './core';
import { ActivationGuard } from './shared/activation/activation-guard.service';
import { AuthGuard } from './shared/auth/auth-guard.service';
import { LocalGuard } from './shared/local/local-guard.service';

export const AppRoutes: Routes = [{
  path: '',
  component: AdminLayoutComponent,
  // canActivate: [ ActivationGuard, AuthGuard ],
  children: [{
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivateChild: [ LocalGuard, ActivationGuard,  AuthGuard ]
  },
  {
    path: 'vente',
    loadChildren: './vente/vente.module#VenteModule',
    canActivateChild: [ LocalGuard, ActivationGuard,  AuthGuard ]
  },
  {
    path: 'poste',
    loadChildren: './poste/poste.module#PosteModule',
    canActivateChild: [ LocalGuard, ActivationGuard,  AuthGuard ]
  },
  {
    path: 'console',
    loadChildren: './console/console.module#ConsoleModule',
    canActivateChild: [ LocalGuard, ActivationGuard,  AuthGuard ]
  },
  {
    path: 'tarif',
    loadChildren: './tarif/tarif.module#TarifModule',
    canActivateChild: [ LocalGuard, ActivationGuard,  AuthGuard ]
  },
  {
    path: 'raport',
    loadChildren: './raport/raport.module#RaportModule',
    canActivateChild: [ LocalGuard, ActivationGuard,  AuthGuard ]
  },
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule',
    canActivateChild: [ LocalGuard, ActivationGuard,  AuthGuard ]
  },
  
  {
    path: 'information',
    loadChildren: './information/information.module#InformationModule',
    canActivateChild: [ LocalGuard, ActivationGuard,  AuthGuard ]
  },
  {
    path: 'password',
    loadChildren: './password/password.module#PasswordModule',
    canActivateChild: [ LocalGuard, ActivationGuard,  AuthGuard ]
  },
  {
    path: 'licence',
    loadChildren: './licence/licence.module#LicenceModule',
    canActivateChild: [ LocalGuard, ActivationGuard,  AuthGuard ]
  },
]
  }, {
  path: '',
  component: AuthLayoutComponent,
  children: [
    {
      path: 'wizard',
      loadChildren: './wizard/wizard.module#WizardModule',
    },
    {
      path: 'reactivation',
      loadChildren: './re-activation/re-activation.module#ReActivationModule',
    },
    {
      path: 'session',
      loadChildren: './session/session.module#SessionModule',
    },
    {
      path: 'local',
      loadChildren: './local/local.module#LocalModule'
    }
  ]
}, {
  path: '**',
  redirectTo: 'session/404'
}];
