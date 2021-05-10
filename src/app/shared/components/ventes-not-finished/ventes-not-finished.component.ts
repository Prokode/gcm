import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material';
import {GlobalVariable} from '../../../global';
import {
  VenteService
} from '../../../vente/vente.service';

import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-ventes-not-finished',
  templateUrl: './ventes-not-finished.component.html',
  styleUrls: ['./ventes-not-finished.component.scss']
})
export class VentesNotFinishedComponent implements OnInit {

  ventesNotFinished: any = [];
  globals = GlobalVariable;
  loading: boolean = false;
  onProcess: boolean  = false;
  constructor(
    public dialogRef: MatDialogRef<VentesNotFinishedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private venteService: VenteService,
    private socket: Socket
  ) { 
    this.loading = true;
    console.log(data);
    this.ventesNotFinished = data.ventesNotFinished;
    this.loading = false;
  }

  ngOnInit() {
  }

  beginTime(row) {
    this.onProcess = true;
    this.loading = true;
    this.venteService.venteNotFinishedSubject.next(row);
    this.ventesNotFinished = this.ventesNotFinished.filter(
      (vente) => {
        return vente._id != row._id;
      }
    );
    window.localStorage.setItem('ventesNotFinished', JSON.stringify(this.ventesNotFinished));
    this.onProcess = false;
    this.loading = false;
  }

  cancelTime(row) {
    this.onProcess = true;
    this.loading = true;
    this.venteService.stopVente(
      {
        'vente_id': row._id
      }
    ).subscribe(
      (res) => {
        this.ventesNotFinished = this.ventesNotFinished.filter(
          (vente) => {
            return vente._id != row._id;
          }
        );
        window.localStorage.setItem('ventesNotFinished', JSON.stringify(this.ventesNotFinished));
        this.onProcess = false;
        this.loading = false;
      },
      (err) => {
        alert("Une erreur s'est produite, réesseyez s'il vous plaît.");
        this.onProcess = false;
        this.loading = false;
      }
    );
  }

  cancelAllTimePromise() {
    return new Promise((resolve, reject) => {
      this.ventesNotFinished.map(
        (vente, id) => {
          this.cancelTime(vente);
          if (id === ( this.ventesNotFinished.length - 1)) {
            resolve({});
          }
        }
      )
    });
  }

  cancelAllTime() {
    this.cancelAllTimePromise().then(
      () => {
        this.dialogRef.close();
      }
    );
  }

  close() {
    this.dialogRef.close();
  }

}
