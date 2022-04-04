import { Routes } from '@angular/router';
import { BoardCreateComponent } from './board-create/board-create.component';
import { BoardEditComponent } from './board-edit/board-edit.component';
import { BoardComponent } from './board.component';
import { BoardDetailResolver } from './board-detail.resolver';

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
    {
      path: ':id/edit',
      component: BoardEditComponent,
      resolve: {
        board: BoardDetailResolver
      }
    },
  ]
  }
];
