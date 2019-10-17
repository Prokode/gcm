import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatIconModule, MatCardModule, MatInputModule, MatCheckboxModule, MatButtonModule,
  MatSelectModule, MatTooltipModule, MatProgressSpinnerModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TarifRoutes } from './tarif.routing';
import { TarifComponent } from './tarif.component';
import { TarifFormComponent } from './tarif-form/tarif-form.component';
import { TarifShowComponent } from './tarif-show/tarif-show.component';
import { TarifEditComponent } from './tarif-edit/tarif-edit.component';
import { TarifCreateComponent } from './tarif-create/tarif-create.component';
import { TarifService } from './tarif.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ConsoleDetailResolver } from '../console/console-detail.resolver';
import { ConsoleListResolver } from '../console/console-list.resolver';
import { ConsoleService } from '../console/console.service';
import { TarifDetailResolver } from './tarif-detail.resolver';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TarifRoutes),
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
      TarifComponent,
      TarifFormComponent,
      TarifShowComponent,
      TarifEditComponent,
      TarifCreateComponent
  ],
  providers: [ 
    TarifService,
    ConsoleDetailResolver,
    ConsoleListResolver,
    ConsoleService,
    TarifDetailResolver
  ],
  entryComponents: []
})

export class TarifModule {}
