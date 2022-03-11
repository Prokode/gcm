import { Routes } from '@angular/router';
import { BoardCreateComponent } from './board-create/board-create.component';
import { BoardComponent } from './board.component';

export const BoardRoutes: Routes = [
  {
    path: '',
    children: [
    {
      path: '',
      component: BoardComponent
    },
    {
        path: 'create',
        component: BoardCreateComponent
      },
  ]
  }
];
