import { Routes } from '@angular/router';
import { ConsoleComponent } from './console.component';
import { ConsoleCreateComponent } from './console-create/console-create.component';
import { ConsoleDetailResolver } from './console-detail.resolver';
import { ConsoleShowComponent } from './console-show/console-show.component';
import { ConsoleEditComponent } from './console-edit/console-edit.component';
export const ConsoleRoutes: Routes = [
  {
    path: '',
    children: [{
      path: '',
      component: ConsoleComponent
    },
    {
      path: 'create',
      component: ConsoleCreateComponent
    },
    {
      path: ':id/show',
      component: ConsoleShowComponent,
      resolve: {console: ConsoleDetailResolver } 
    },
    {
      path: ':id/edit',
      component: ConsoleEditComponent,
      resolve: {console: ConsoleDetailResolver } 
    }
  ]
  }
];
