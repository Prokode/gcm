import { Routes } from '@angular/router';
import { RaportComponent } from './raport.component';
import { ConsoleListResolver } from '../console/console-list.resolver';
import { PosteListResolver } from '../poste/poste-list.resolver';
import { UserListResolver } from '../user/user-list.resolver';
import { RaportResultComponent } from './raport-result/raport-result.component';

export const RaportRoutes: Routes = [
  {
    path: '',
    children: [{
      path: '',
      component: RaportComponent,
      resolve: {
          consoles: ConsoleListResolver,
          postes: PosteListResolver,
          users: UserListResolver
      } 
    },
    {
      path: 'result',
      component: RaportResultComponent
    }
  ]
  }
];
