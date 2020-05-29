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
import { PasswordRoutes } from './password.routing';
import { PasswordComponent } from './password.component';
import { PasswordService } from './password.service';
import { UserService } from '../shared/user/user.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PasswordRoutes),
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
     PasswordComponent
  ],
  providers: [ 
    PasswordService,
    UserService
  ],
  entryComponents: []
})

export class PasswordModule {}
