import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';

// import {PhotoBlockComponent} from './components/photo-block/photo-block.component';
import { MatButtonModule, MatTooltipModule,
  MatIconModule, MatCardModule } from '@angular/material';

import { UserResolver } from './user/user.resolver';
import { SocietyResolver } from './user/society.resolver';
import { VentesNotFinishedComponent } from './components/ventes-not-finished/ventes-not-finished.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import {
  VenteService
} from '../vente/vente.service';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    NgxDatatableModule,
    MatTooltipModule,
    MatIconModule,
    MatCardModule,
  ],
  declarations: [
  VentesNotFinishedComponent],
  exports: [
    VentesNotFinishedComponent
   ],
  entryComponents: [
    VentesNotFinishedComponent
   ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    VenteService
   ]
})
export class SharedModule { }
