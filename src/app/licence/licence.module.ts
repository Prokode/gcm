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
import { LicenceRoutes } from './licence.routing';
import { LicenceComponent } from './licence.component';
import { LicenceService } from './licence.service';
import { LicenceResolver } from './licence.resolver';
import { ActivationService } from '../shared/activation/activation.service';
import { WizardService } from '../wizard/wizard.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LicenceRoutes),
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
      LicenceComponent
  ],
  providers: [ 
      LicenceService,
      LicenceResolver,
      ActivationService,
      WizardService
  ],
  entryComponents: []
})

export class LicenceModule {}
