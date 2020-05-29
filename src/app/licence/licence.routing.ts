import { Routes } from '@angular/router';
import { LicenceComponent } from './licence.component';
import { LicenceResolver } from './licence.resolver';

export const LicenceRoutes: Routes = [
  {
    path: '',
    children: [{
      path: '',
      component: LicenceComponent,
      resolve: {licence: LicenceResolver}
    }
  ]
  }
];
