import { Routes } from '@angular/router';
import { PosteComponent } from './poste.component';
import { ConsoleListResolver } from '../console/console-list.resolver';
import { PosteCreateComponent } from './poste-create/poste-create.component';
export const PosteRoutes: Routes = [
  {
    path: '',
    children: [{
      path: '',
      component: PosteComponent
    },
    {
      path: 'create',
      component: PosteCreateComponent,
      resolve: {consoles: ConsoleListResolver} 
    },
  ]
  }
];
