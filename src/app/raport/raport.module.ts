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
import { RaportComponent } from './raport.component';
import { RaportRoutes } from './raport.routing';
import { RaportService } from './raport.service';
import { PosteListResolver } from '../poste/poste-list.resolver';
import { ConsoleListResolver } from '../console/console-list.resolver';
import { UserListResolver } from '../user/user-list.resolver';
import { PosteService } from '../poste/poste.service';
import { ConsoleService } from '../console/console.service';
import { UserLoggedService } from '../user/user-logged.service';
import { RaportResultComponent } from './raport-result/raport-result.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RaportRoutes),
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
     RaportComponent,
     RaportResultComponent
  ],
  providers: [ 
      RaportService,
      PosteService,
      ConsoleService,
      UserLoggedService,
      PosteListResolver,
      ConsoleListResolver,
      UserListResolver
   ],
  entryComponents: [
  ]
})

export class RaportModule {}
