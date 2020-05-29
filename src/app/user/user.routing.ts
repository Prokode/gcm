import { Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailResolver } from './user-detail.resolver';

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
        },
        {
          path: ':id/edit',
          component: UserEditComponent,
          resolve: {user: UserDetailResolver}
      }
    ]
  }
];
