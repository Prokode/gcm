import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatIconModule, MatCardModule, MatInputModule, MatCheckboxModule, MatButtonModule,
  MatSelectModule, MatTooltipModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReActivationComponent } from './re-activation.component';
import { ReActivationRoutes } from './re-activation.routing';
import { ActivationComponent } from '../wizard/activation/activation.component';
import { WizardService } from '../wizard/wizard.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ReActivationRoutes),
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
    ReActivationComponent,
    ActivationComponent
  ],
  providers: [ 
      WizardService
  ],
  entryComponents: []
})

export class ReActivationModule {}
