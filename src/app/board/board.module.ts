import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatIconModule, MatCardModule, MatInputModule, MatCheckboxModule, MatButtonModule,
  MatSelectModule, MatTooltipModule, MatProgressSpinnerModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BoardRoutes } from './board.routing';
import { BoardComponent } from './board.component';
import { BoardService } from './board.service';
import { BoardFormComponent } from './board-form/board-form.component';
import { BoardCreateComponent } from './board-create/board-create.component';
import { BoardEditComponent } from './board-edit/board-edit.component';
import { BoardListResolver } from './board-list.resolver';
import { BoardDetailResolver } from './board-detail.resolver';
import { BoardValidators } from './board-form/board.validators';
import {NgxMaskModule} from 'ngx-mask';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild( BoardRoutes ),
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTooltipModule,
    NgxDatatableModule,
    MatProgressSpinnerModule,
    NgxMaskModule.forRoot()
   ],
  declarations: [
      BoardComponent,
      BoardFormComponent,
      BoardCreateComponent,
      BoardEditComponent
  ],
  providers: [ 
      BoardService,
      BoardListResolver,
      BoardValidators,
      BoardDetailResolver
  ],
  entryComponents: []
})

export class BoardModule {}
