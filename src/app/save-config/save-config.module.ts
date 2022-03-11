import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatIconModule, MatCardModule, MatInputModule, MatCheckboxModule, MatButtonModule,
  MatSelectModule, MatTooltipModule, MatProgressSpinnerModule, MatProgressBarModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SaveConfigRoutes } from './save-config.routing';
import { SaveConfigComponent } from './save-config.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SaveConfigService } from './save-config.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild( SaveConfigRoutes ),
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
    MatProgressBarModule
   ],
  declarations: [
      SaveConfigComponent
  ],
  providers: [ 
      SaveConfigService
  ],
  entryComponents: []
})

export class  SaveConfigModule {}
