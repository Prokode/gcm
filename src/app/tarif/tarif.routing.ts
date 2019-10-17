import { Routes } from '@angular/router';
import { TarifComponent } from './tarif.component';
import { TarifCreateComponent } from './tarif-create/tarif-create.component';
import { ConsoleListResolver } from '../console/console-list.resolver';
import { TarifEditComponent } from './tarif-edit/tarif-edit.component';
import { TarifDetailResolver } from './tarif-detail.resolver';
export const TarifRoutes: Routes = [
  {
    path: '',
    children: [{
      path: '',
      component: TarifComponent
    },
    {
      path: ':id/create',
      component: TarifCreateComponent ,
      resolve: {consoles: ConsoleListResolver } 
    },
    {
      path: ':id/edit',
      component: TarifEditComponent,
      resolve: {consoles: ConsoleListResolver, tarif: TarifDetailResolver } 
    },
  ]
  }
];
