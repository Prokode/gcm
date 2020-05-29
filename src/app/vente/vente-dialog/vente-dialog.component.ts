import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vente-dialog',
  templateUrl: './vente-dialog.component.html',
  styleUrls: ['./vente-dialog.component.scss']
})
export class VenteDialogComponent implements OnInit {
  current_poste: any;
  tarif: any = null;
  form: FormGroup
  constructor(
    public dialogRef: MatDialogRef<VenteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { 
    this.form = this.fb.group ({
      tarif: [null , Validators.compose ([Validators.required])],
    });
  }

  ngOnInit() {
    this.current_poste = this.data.poste;
  }

  submit() {
    let tarif = this.form.value.tarif;
    console.log(tarif);
    // this.current_poste.tarif = null;
    this.current_poste.tarif = this.form.value.tarif;
    // if (this.poste.tarif) {
    //   console.log("Not empty tarif");
    //   this.poste.tarif.hour = tarif.hour;
    //   this.poste.tarif.minute = tarif.minute;
    //   this.poste.tarif.second = tarif.second;
    // } else {
    //   this.poste.tarif = this.form.value.tarif;
    // }
    console.log(this.current_poste);
    this.dialogRef.close(this.current_poste);
  }

}
