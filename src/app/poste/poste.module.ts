import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatIconModule, MatCardModule, MatInputModule, MatCheckboxModule, MatButtonModule,
  MatSelectModule, MatTooltipModule, MatProgressSpinnerModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PosteComponent } from './poste.component';
import { PosteRoutes } from './poste.routing';
import { PosteService } from './poste.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PosteFormComponent } from './poste-form/poste-form.component';
import { PosteCreateComponent } from './poste-create/poste-create.component';
import { PosteEditComponent } from './poste-edit/poste-edit.component';
import { ConsoleModule } from '../console/console.module';
import { ConsoleListResolver } from '../console/console-list.resolver';
import { ConsoleService } from '../console/console.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PosteRoutes),
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
      PosteComponent,
      PosteFormComponent,
      PosteCreateComponent,
      PosteEditComponent
  ],
  providers: [ 
    PosteService,
    ConsoleListResolver,
    ConsoleService
  ],
  entryComponents: []
})

export class PosteModule {}
