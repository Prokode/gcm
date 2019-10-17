import { Routes } from '@angular/router';

import { AdminLayoutComponent, AuthLayoutComponent } from './core';
import { ActivationGuard } from './shared/activation/activation-guard.service';
import { AuthGuard } from './shared/auth/auth-guard.service';

export const AppRoutes: Routes = [{
  path: '',
  component: AdminLayoutComponent,
  canActivate: [ ActivationGuard, AuthGuard ],
  children: [{
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'poste',
    loadChildren: './poste/poste.module#PosteModule'
  },
  {
    path: 'console',
    loadChildren: './console/console.module#ConsoleModule'
  },
  {
    path: 'tarif',
    loadChildren: './tarif/tarif.module#TarifModule'
  }
]
  }, {
  path: '',
  component: AuthLayoutComponent,
  children: [
    {
      path: 'wizard',
      loadChildren: './wizard/wizard.module#WizardModule'
    },
    {
      path: 'reactivation',
      loadChildren: './re-activation/re-activation.module#ReActivationModule'
    },
    {
    path: 'session',
    loadChildren: './session/session.module#SessionModule'
    }
  ]
}, {
  path: '**',
  redirectTo: 'session/404'
}];
