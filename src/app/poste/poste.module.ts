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
import { PosteactResolver } from './posteact.resolver';
import { ActivationService } from '../shared/activation/activation.service';
import { PosteNameResolver } from './poste-name.resolver';
import { PosteValidators } from './poste.validators';
import { PosteDetailResolver } from './poste-detail.resolver';
import { PosteShowComponent } from './poste-show/poste-show.component';
import { PosteListResolver } from './poste-list.resolver';
import { PosteCodeFormComponent } from './poste-code-form/poste-code-form.component';
import { PosteCodeComponent } from './poste-code/poste-code.component';

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
      PosteEditComponent,
      PosteShowComponent,
      PosteCodeFormComponent,
      PosteCodeComponent
  ],
  providers: [ 
    PosteService,
    ConsoleListResolver,
    ConsoleService,
    PosteactResolver,
    PosteNameResolver,
    ActivationService,
    PosteValidators,
    PosteDetailResolver,
    PosteListResolver
  ],
  entryComponents: []
})

export class PosteModule {}
