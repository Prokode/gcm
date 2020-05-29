import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StandByService } from '../../stand-by/stand-by.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SnackMessageService } from '../../shared/snack-messages/snack-message.service';
import { SnackMessage } from '../../shared/snack-messages/snack-message.model';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss']
})
export class ConfirmPasswordComponent implements OnInit {
  form: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder, 
    public dialogRef: MatDialogRef<ConfirmPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackMessageService: SnackMessageService,
    private standByService: StandByService) { 
    this.form = this.fb.group({
      password: [null , Validators.compose ([Validators.required]),
        Validators.composeAsync([])]
    });
  }

  ngOnInit() {
  }

  submit() {
    this.loading = true;
    this.standByService.verifyPassword(this.form.getRawValue()).subscribe(
      (res) => {
        this.loading = false;
        if (res.message === "success") {
          this.dialogRef.close(true);
        } else if (res.message === "incorrect_password") {
          this.snackMessageService.newMessage.next(
            new SnackMessage('danger',
             'Le mot de passe entré est incorrecte.'));
        }
      }, (err) => {
        this.loading = false;
        this.snackMessageService.newMessage.next(
          new SnackMessage('danger',
           'Le mot de passe entré est incorrecte.'));
      }
    );
  }

  cancel() {
    this.dialogRef.close(false);
  }



}
