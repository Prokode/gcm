import { Routes } from '@angular/router';
import { PosteComponent } from './poste.component';
import { ConsoleListResolver } from '../console/console-list.resolver';
import { PosteCreateComponent } from './poste-create/poste-create.component';
import { PosteactResolver } from './posteact.resolver';
import { PosteNameResolver } from './poste-name.resolver';
import { PosteEditComponent } from './poste-edit/poste-edit.component';
import { PosteDetailResolver } from './poste-detail.resolver';
import { PosteShowComponent } from './poste-show/poste-show.component';
import { PosteCodeComponent } from './poste-code/poste-code.component';

export const PosteRoutes: Routes = [
  {
    path: '',
    children: [{
      path: '',
      component: PosteComponent,
      resolve: {posteact: PosteactResolver } 
    },
    {
      path: 'create',
      component: PosteCreateComponent,
      resolve: {consoles: ConsoleListResolver, posteName: PosteNameResolver} 
    },
    {
      path: ':id/edit',
      component: PosteEditComponent,
      resolve: {consoles: ConsoleListResolver, poste: PosteDetailResolver} 
    },
    {
      path: ':id/show',
      component: PosteShowComponent,
      resolve: {consoles: ConsoleListResolver, poste: PosteDetailResolver} 
    },
    {
      path: 'code',
      component: PosteCodeComponent,
      resolve: {posteact: PosteactResolver } 
    },
  ]
  }
];
