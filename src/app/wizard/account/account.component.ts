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
  root_pwd = null;
  society = null;
  constructor(private fb: FormBuilder, private accountValidators: AccountValidators,
     private wizardService: WizardService,  private snackMessageService : SnackMessageService ) {
    this.form = this.fb.group ( {
      lastname: [null , Validators.compose ( [ Validators.required ] )],
      firstname: [null , Validators.compose ( [ Validators.required ] )],
      username: [null , Validators.compose ( [ Validators.required ] ),
       Validators.composeAsync([ this.accountValidators.uniqueUsernameValidator.bind(this.accountValidators) ]) ],
      password: [null , Validators.compose ( [ Validators.required, Validators.minLength(8) ] )],
      passwordConfirm:  [null , Validators.compose ( [Validators.required, this.accountValidators.samePasswordValidator.bind(this.accountValidators) ] )],
      rp: [null , Validators.compose ( [ ] )],
      society: [null , Validators.compose ( [ ] )],
    });

    this.wizardService.rootPasswordShare.asObservable().subscribe(
      (rp) => {
       this.root_pwd = rp;
      }
    );

    this.wizardService.societyShare.asObservable().subscribe(
      (society) => {
       this.society = society;
      }
    );

   }

  ngOnInit() {
  }

  submit() {
    this.form.controls['rp'].setValue(this.root_pwd ? this.root_pwd : 'gcmmanager');
    // this.form.controls['society'].setValue(this.society);
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
