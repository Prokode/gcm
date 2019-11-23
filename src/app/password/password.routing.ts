import { Routes } from '@angular/router';
import { PasswordComponent } from './password.component';

export const PasswordRoutes: Routes = [
  {
    path: '',
    children: [{
      path: '',
      component: PasswordComponent
    }
  ]
  }
];
