import { Routes } from '@angular/router';
import { LocalComponent } from './local.component';

export const LocalRoutes: Routes = [
  {
    path: '',
    children: [{
      path: '',
      component: LocalComponent
    }
  ]
  }
];
