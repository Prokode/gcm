import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserValidators } from '../user.validators';
import { UserLoggedService } from '../user-logged.service';
import { SnackMessageService } from '../../shared/snack-messages/snack-message.service';
import { SnackMessage } from '../../shared/snack-messages/snack-message.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  form: FormGroup;
  @Input('formstate') formstate: any;
  roles = [
    // 'ADMIN', 
    'AGENT'];
  loading = false;
  constructor(private fb: FormBuilder, private userValidators: UserValidators, 
    private router: Router,
    private userLoggedService: UserLoggedService, private snackMessageService: SnackMessageService ) {
    this.form = this.fb.group ( {
      lastname: [null , Validators.compose ( [ Validators.required ] )],
      firstname: [null , Validators.compose ( [ Validators.required ] )],
      username: [null , Validators.compose ( [ Validators.required ] ),
       Validators.composeAsync([ this.userValidators.uniqueUsernameValidator.bind(this.userValidators) ]) ],
      password: [null , Validators.compose ( [ Validators.required, Validators.minLength(8) ] )],
      passwordConfirm:  [null , Validators.compose ( [Validators.required, this.userValidators.samePasswordValidator.bind(this.userValidators) ] )],
      role: [null , Validators.compose ( [ Validators.required ] )]
    });
   }

  ngOnInit() {
  }

  submit() {
    this.loading = true;
    this.form.disable();
    if (this.formstate === 'create') {
      this.userLoggedService.createUser(this.form.value).subscribe(
        (res) => {
          if (res.message === 'success') {
            this.loading = false;
            this.snackMessageService.newMessage.next(
              new SnackMessage('success',
               'L\'utilisateur a été bien crééé.'));
              this.router.navigate(['/user'])
          } else {
            this.loading = false;
            this.form.enable();
            this.snackMessageService.newMessage.next(
              new SnackMessage('danger',
               'Une erreur s\'est produite lors de l\'opération, réesseyez.'));
          }
        }, (err) => {
          this.loading = false;
          this.form.enable();
          this.snackMessageService.newMessage.next(
            new SnackMessage('danger',
             'Une erreur s\'est produite lors de l\'opération, réesseyez.'));
        }
      )
    }
  }

}
