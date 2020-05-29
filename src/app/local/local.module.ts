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
import { LocalRoutes } from './local.routing';
import { LocalComponent } from './local.component';
import { WizardService } from '../wizard/wizard.service';
import { LocalService } from '../shared/local/local.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LocalRoutes),
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
      LocalComponent
  ],
  providers: [ 
      WizardService,
      LocalService
  ],
  entryComponents: []
})

export class LocalModule {}
