import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatIconModule, MatCardModule, MatInputModule, MatCheckboxModule, MatButtonModule,
  MatSelectModule, MatTooltipModule, MatProgressSpinnerModule, MatDialogModule, MatMenuModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { VenteComponent } from './vente.component';
import { PosteService } from '../poste/poste.service';
import { VenteRoutes } from './vente.routing';
import { PostesTarifsResolver } from './postes-tarifs.resolver';
import {
  PostesStatesResolver
} from './postes-states.resolver';
import { VenteDialogComponent } from './vente-dialog/vente-dialog.component';
import { VenteService } from './vente.service';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { VenteListComponent } from './vente-list/vente-list.component';
import { VenteListResolver } from './vente-list.resolvver';
import { StandByService } from '../stand-by/stand-by.service';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';
import { VenteCurrentComponent } from './vente-current/vente-current.component';

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
    MatMenuModule,
    SocketIoModule.forRoot(config)
   ],
  declarations: [
     VenteComponent,
     VenteDialogComponent,
     VenteListComponent,
     ConfirmPasswordComponent,
     VenteCurrentComponent,
  ],
  providers: [ 
    PosteService,
    PostesTarifsResolver,
    VenteService,
    VenteListResolver,
    StandByService,
    PostesStatesResolver
  ],
  entryComponents: [
      VenteDialogComponent,
      ConfirmPasswordComponent
  ]
})

export class VenteModule {}
