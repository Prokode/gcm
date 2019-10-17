import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatIconModule, MatCardModule, MatInputModule, MatCheckboxModule, MatButtonModule,
  MatSelectModule, MatTooltipModule, MatProgressSpinnerModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ConsoleComponent } from './console.component';
import { ConsoleRoutes } from './console.routing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ConsoleService } from './console.service';
import { ConsoleFormComponent } from './console-form/console-form.component';
import { ConsoleCreateComponent } from './console-create/console-create.component';
import { ConsoleEditComponent } from './console-edit/console-edit.component';
import { ConsoleValidators } from './console-form/console.validators';
import { ConsoleShowComponent } from './console-show/console-show.component';
import { ConsoleDetailResolver } from './console-detail.resolver';
import { ConsoleListResolver } from './console-list.resolver';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ConsoleRoutes),
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
    MatProgressSpinnerModule
   ],
  declarations: [
      ConsoleComponent,
      ConsoleFormComponent,
      ConsoleCreateComponent,
      ConsoleEditComponent,
      ConsoleShowComponent
  ],
  providers: [ 
      ConsoleService,
      ConsoleValidators,
      ConsoleDetailResolver,
      ConsoleListResolver
  ],
  entryComponents: []
})

export class ConsoleModule {}
