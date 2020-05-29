import { Routes } from '@angular/router';
import { VenteComponent } from './vente.component';
import { PostesTarifsResolver } from './postes-tarifs.resolver';
import { VenteListComponent } from './vente-list/vente-list.component';
import { VenteListResolver } from './vente-list.resolvver';
import { VenteCurrentComponent } from './vente-current/vente-current.component';

export const VenteRoutes: Routes = [
  {
    path: '',
    children: [{
      path: '',
      component: VenteComponent,
      resolve: {postestarifs: PostesTarifsResolver}
    },
    {
      path: 'list',
      component: VenteListComponent
    },
    {
      path: 'current',
      component: VenteCurrentComponent,
      resolve: {postestarifs: PostesTarifsResolver}
    }
  ]
  }
];
