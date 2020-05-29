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
import { StandByRoutes } from './stand-by.routing';
import { StandByComponent } from './stand-by.component';
import { StandByService } from './stand-by.service';
import { UserService } from '../shared/user/user.service';

@NgModule({
  imports: [
    CommonModule,
    // RouterModule.forChild(StandByRoutes),
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
      StandByComponent
  ],
  providers: [ 
    StandByService,
    UserService
  ],
  entryComponents: [],
  exports: [
      StandByComponent
  ]
})

export class StandByModule {}
