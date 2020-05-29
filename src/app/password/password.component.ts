import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PasswordService } from './password.service';
import { SnackMessageService } from '../shared/snack-messages/snack-message.service';
import { SnackMessage } from '../shared/snack-messages/snack-message.model';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  form: FormGroup;
  onModificate = false;
  constructor(private fb: FormBuilder, 
    private passwordService: PasswordService,
    private userService: UserService,
    private snackMessageService: SnackMessageService) {
    this.form = this.fb.group ( {
      oldPassword: [null , Validators.compose ( [ Validators.required] )],
      password: [null , Validators.compose ( [ Validators.required, Validators.minLength(8) ] )],
      passwordConfirm:  [null , Validators.compose ( [Validators.required,
         this.samePasswordValidator ] )]
    });
   }

  ngOnInit() {
    this.form.disable();
  }

  samePasswordValidator(control: FormControl) {
    if (control) {
      const parent = control.parent;
      if (parent) {
          if (parent.controls['password'].value === control.value) {
              return;
          } else {
              return { samePassword: true };
          }
        }    
    }
  }
  
  activateModification() {
    this.onModificate = !this.onModificate;
    if(this.onModificate) {
      this.form.enable();
    } else {
      this.form.disable();
    }
  }

  submit() {
    this.form.disable();
    this.passwordService.changePassword(this.form.value).subscribe(
      (res) => {
        if (res.message === 'success') {
          this.form.enable();
          this.form.reset();
          this.snackMessageService.newMessage.next(
            new SnackMessage('success',
             'Le mot de passe a été réinitialisé avec succès, vous allez être déconnecté.'));
          this.userService.logOutSubject.next(true);
        } else if (res.message === 'wrong_password') {
          this.form.enable();
          this.snackMessageService.newMessage.next(
            new SnackMessage('danger', 'Le mot de passe en cours est incorrect.'));
        }
      }, (err) => {
        this.form.enable();
          this.snackMessageService.newMessage.next(
            new SnackMessage('danger', 'Une erreur s\'est produite réesseyez s\'il vous plaît.'));
      }
    )
  }

}
