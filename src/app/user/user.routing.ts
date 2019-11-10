import { Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserCreateComponent } from './user-create/user-create.component';

export const UserRoutes: Routes = [
  {
    path: '',
    children: [
        {
            path: '',
            component: UserComponent
        },
        {
            path: 'create',
            component: UserCreateComponent
        }
    ]
  }
];
