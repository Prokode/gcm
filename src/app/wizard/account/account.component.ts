import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountValidators } from './account.validators';
import { WizardService } from '../wizard.service';
import { SnackMessageService } from '../../shared/snack-messages/snack-message.service';
import { SnackMessage } from '../../shared/snack-messages/snack-message.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  form: FormGroup;
  @Output() onAccountSuccess: EventEmitter<any> = new EventEmitter<any>(); 
  constructor(private fb: FormBuilder, private accountValidators: AccountValidators,
     private wizardService: WizardService,  private snackMessageService : SnackMessageService ) {
    this.form = this.fb.group ( {
      username: [null , Validators.compose ( [ Validators.required ] ),
       Validators.composeAsync([ this.accountValidators.uniqueUsernameValidator.bind(this.accountValidators) ]) ],
      password: [null , Validators.compose ( [ Validators.required, Validators.minLength(8) ] )],
      passwordConfirm:  [null , Validators.compose ( [Validators.required, this.accountValidators.samePasswordValidator.bind(this.accountValidators) ] )]
    });
   }

  ngOnInit() {
  }

  submit() {
    this.wizardService.createAdminAccount(this.form.value).subscribe(
      (res) => {
        if (res.message === 'success') {
          this.form.disable();
          this.snackMessageService.newMessage.next(
            new SnackMessage('success', 'Le compte administrateur a été bien créé'));
          this.onAccountSuccess.emit(true);
        }
      }, (err) => {
        this.snackMessageService.newMessage.next(
          new SnackMessage('danger', 'Une erreur s\'est produite, veuillez réesseyer.'));
      }
    );
  }


}
