import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { VenteDialogComponent } from './vente-dialog/vente-dialog.component';
import { VenteService } from './vente.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.scss']
})
export class VenteComponent implements OnInit {
  postes: any = [];
  dialogRef: MatDialogRef<VenteDialogComponent> | null;
  config = {
    disableClose: false,
    panelClass: 'custom-overlay-pane-class',
    hasBackdrop: true,
    backdropClass: '',
    width: '50%',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    },
    data: {
      poste: null,
      state: null
    }
  };

  constructor(private route: ActivatedRoute,
    private venteService: VenteService,
    private socket: Socket,
    private dialog: MatDialog) {
    this.socket.fromEvent("clock_refresh").subscribe(
      (data: any) => {
        this.postes.forEach(poste => {
          if (poste.poste._id === data.poste._id) {
            poste.time = data.time;
            poste.tarif = data.tarif;
          }
        });
      }
    );

    this.socket.fromEvent("clock_end").subscribe(
      (data: any) => {
        this.postes.forEach((poste, index) => {
          if (poste.poste._id === data.poste._id) {
            poste.time = null;
            poste.tarif = null;
          }
        });
      }
    );
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data: any) => {
        this.postes = data['postestarifs'].map(
          (poste) => {
            return {
              poste: poste.poste,
              console: poste.console,
              tarifs: poste.tarifs,
              tarif: null,
              time: null
            }
          }
        );
      }
    );
  }

  openVenteDialog(poste, state) {
    this.config.data.poste = poste;
    this.config.data.state = state;
    this.dialogRef = this.dialog.open( VenteDialogComponent, this.config);
    this.dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (this.config.data.state === 'add') {
          this.startTime(poste);
        }
      }
    });
  }

  startTime(poste) {
    this.venteService.createVente(poste).subscribe(
      (res) => {
        if(res.message === 'success') {
          this.socket.emit("start_chrono", res.vente);
        }
      }, (err) => {
        console.log(err);
      }
    );
  }

  abortTime(poste) {
    poste.time = null;
    poste.tarif = null;
  }

  stopTime(poste) {
    this.socket.emit("stop_chrono", poste.poste);
  }

}
