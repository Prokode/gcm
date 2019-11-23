import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatIconModule, MatCardModule, MatInputModule, MatCheckboxModule, MatButtonModule,
  MatSelectModule, MatTooltipModule, MatProgressSpinnerModule, MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatExpansionModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UserComponent } from './user.component';
import { UserRoutes } from './user.routing';
import { UserValidators } from './user.validators';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserLoggedService } from './user-logged.service';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListResolver } from './user-list.resolver';
import { UserEditComponent } from './user-edit/user-edit.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserRoutes),
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
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule
   ],
  declarations: [
     UserComponent,
     UserCreateComponent,
     UserFormComponent,
     UserEditComponent
  ],
  providers: [ 
      UserValidators,
      UserLoggedService,
      UserListResolver
   ],
  entryComponents: [
  ]
})

export class UserModule {}
