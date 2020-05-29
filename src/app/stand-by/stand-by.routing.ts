import { Routes } from '@angular/router';
import { StandByComponent } from './stand-by.component';

export const StandByRoutes: Routes = [
  {
    path: '',
    children: [{
      path: '',
      component: StandByComponent
    }
  ]
  }
];
