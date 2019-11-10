import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-vente-dialog',
  templateUrl: './vente-dialog.component.html',
  styleUrls: ['./vente-dialog.component.scss']
})
export class VenteDialogComponent implements OnInit {
  poste: any;
  tarif: any = null;
  constructor(
    public dialogRef: MatDialogRef<VenteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 

  }

  ngOnInit() {
    this.poste = this.data.poste;
  }

  submit() {
    this.poste.tarif = this.tarif;
    this.dialogRef.close(this.poste);
  }

}
