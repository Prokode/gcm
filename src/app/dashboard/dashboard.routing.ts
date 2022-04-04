import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

import { LicenceResolver } from '../licence/licence.resolver';

export const DashboardRoutes: Routes = [{
  path: '',
  component: DashboardComponent,
  resolve: {
    licence: LicenceResolver
  }
}];
