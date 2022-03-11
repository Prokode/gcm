import { Routes } from '@angular/router';
import { SaveConfigComponent } from './save-config.component';


export const SaveConfigRoutes: Routes = [
  {
    path: '',
    children: [{
      path: '',
      component: SaveConfigComponent
    }
  ]
  }
];
