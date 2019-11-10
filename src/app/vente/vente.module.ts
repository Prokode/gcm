import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatIconModule, MatCardModule, MatInputModule, MatCheckboxModule, MatButtonModule,
  MatSelectModule, MatTooltipModule, MatProgressSpinnerModule, MatDialogModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { VenteComponent } from './vente.component';
import { PosteService } from '../poste/poste.service';
import { VenteRoutes } from './vente.routing';
import { PostesTarifsResolver } from './postes-tarifs.resolver';
import { VenteDialogComponent } from './vente-dialog/vente-dialog.component';
import { VenteService } from './vente.service';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { VenteListComponent } from './vente-list/vente-list.component';
import { VenteListResolver } from './vente-list.resolvver';

const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} };


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(VenteRoutes),
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
    SocketIoModule.forRoot(config)
   ],
  declarations: [
     VenteComponent,
     VenteDialogComponent,
     VenteListComponent
  ],
  providers: [ 
    PosteService,
    PostesTarifsResolver,
    VenteService,
    VenteListResolver
  ],
  entryComponents: [
      VenteDialogComponent
  ]
})

export class VenteModule {}
