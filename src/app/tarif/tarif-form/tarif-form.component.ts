import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TarifService } from '../tarif.service';
import { SnackMessageService } from '../../shared/snack-messages/snack-message.service';
import { SnackMessage } from '../../shared/snack-messages/snack-message.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarif-form',
  templateUrl: './tarif-form.component.html',
  styleUrls: ['./tarif-form.component.scss']
})
export class TarifFormComponent implements OnInit {
  form: FormGroup;
  @Input('consoles') consoles: any;
  @Input('console_id') console_id: any;
  @Input('formstate') formstate: any;
  @Input('tarif') tarif: any;
  hours = [
    '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
  ];
  minutes= [
    '00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'
  ];
  constructor(private fb: FormBuilder, private router: Router,
     private tarifService: TarifService, private snackMessageService: SnackMessageService ) { 
    this.form = this.fb.group ({
      cost: [null , Validators.compose ([Validators.required])],
      console_id: [null , Validators.compose ([Validators.required])],
      _id: [null , Validators.compose ([])],
      hour: [null , Validators.compose ([Validators.required])],
      minute: [null , Validators.compose ([Validators.required])]
    });
    
  }

  ngOnInit() {
    if (this.formstate === 'create') {
      this.form.controls['console_id'].setValue(this.console_id);
      this.form.controls['console_id'].disable();
    } else if (this.formstate === 'edit') {
      this.form.patchValue(this.tarif);

      this.form.controls['console_id'].disable();
    }
  }
  
  submit() {
    this.form.disable();
    if (this.formstate === 'create') {
      this.tarifService.checkTimeExist(this.form.getRawValue()).subscribe(
        (res) => {
          if (!res.exist) {
            this.tarifService.createTarif(this.form.getRawValue()).subscribe(
              (res) => {
                this.form.enable();
                this.snackMessageService.newMessage.next(
                  new SnackMessage('success', 'Le tarif a été bien ajouté'));
                  this.router.navigate(['tarif']);
              }, (err) => {
                this.snackMessageService.newMessage.next(
                  new SnackMessage('danger', 'Une erreur s\'est produite lors de l\'opération, réesseyez.'));
                this.form.enable();
                this.form.controls['console_id'].disable();
              }
            );
          } else {
            this.snackMessageService.newMessage.next(
              new SnackMessage('danger', 'L\'heure a été déjà défini sur ce console.'));
            this.form.enable();
            this.form.controls['console_id'].disable();
          }
        }
      );
    } else if (this.formstate === 'edit') {
      this.tarifService.updateTarif(this.form.getRawValue()).subscribe(
        (res) => {
          this.form.enable();
          this.snackMessageService.newMessage.next(
            new SnackMessage('success', 'Le tarif a été bien modifié'));
            this.router.navigate(['tarif']);
        }, (err) => {
          this.snackMessageService.newMessage.next(
            new SnackMessage('danger', 'Une erreur s\'est produite lors de l\'opération, réesseyez.'));
          this.form.enable();
          this.form.controls['console_id'].disable();
        }
      );
    }
  }
}
