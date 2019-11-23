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
import { InformationRoutes } from './information.routing';
import { InformationComponent } from './information.component';
import { InformationService } from './information.service';
import { UserInformationResolver } from './user-information.resolver';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(InformationRoutes),
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
      InformationComponent
  ],
  providers: [ 
    InformationService,
    UserInformationResolver
  ],
  entryComponents: []
})

export class InformationModule {}
