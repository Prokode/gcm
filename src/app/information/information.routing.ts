import { Routes } from '@angular/router';
import { InformationComponent } from './information.component';
import { UserInformationResolver } from './user-information.resolver';

export const InformationRoutes: Routes = [
  {
    path: '',
    children: [{
      path: '',
      component: InformationComponent,
      resolve: {
        user: UserInformationResolver
      } 
    }
  ]
  }
];
