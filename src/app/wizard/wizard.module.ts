import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatIconModule, MatCardModule, MatInputModule, MatCheckboxModule, MatButtonModule,
  MatSelectModule, MatTooltipModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WizardRoutes } from './wizard.routing';
import { WizardComponent } from './wizard.component';
import { ArchwizardModule } from 'ng2-archwizard';
import { ActivationComponent } from './activation/activation.component';
import { InformationComponent } from './information/information.component';
import { WizardService } from './wizard.service';
import { AccountComponent } from './account/account.component';
import { AccountValidators } from './account/account.validators';
import { InformationValidators } from './information/information.validators';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(WizardRoutes),
    ArchwizardModule,
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
    MatTooltipModule
   ],
  declarations: [
      WizardComponent,
      InformationComponent,
      AccountComponent,
      ActivationComponent
  ],
  providers: [
    WizardService,
    AccountValidators,
    InformationValidators    
  ],
  entryComponents: []
})

export class WizardModule {}
