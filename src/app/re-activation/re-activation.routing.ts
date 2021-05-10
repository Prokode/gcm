import { Routes } from '@angular/router';
import { ReActivationComponent } from './re-activation.component';
export const ReActivationRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'home',
      component: ReActivationComponent
    }
  ]
  }
];
