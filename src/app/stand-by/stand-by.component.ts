import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StandByService } from './stand-by.service';
import { SnackMessageService } from '../shared/snack-messages/snack-message.service';
import { SnackMessage } from '../shared/snack-messages/snack-message.model';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-stand-by',
  templateUrl: './stand-by.component.html',
  styleUrls: ['./stand-by.component.scss']
})
export class StandByComponent implements OnInit {
  form: FormGroup;
  @Input('activateFor') activateFor: string = 'activation';
  @Input('society') society: string = null;
  constructor(private fb: FormBuilder, private standByService: StandByService,
     private snackMessageService: SnackMessageService, private userService: UserService) {
    this.form = this.fb.group ({
      password: [null , Validators.compose ([Validators.required]),
        Validators.composeAsync([])]
    });
   }

  ngOnInit() {
  }

  submit() {
    if (this.activateFor === 'verfiy_password') {
      this.standByService.verifyPassword(this.form.value).subscribe(
        (res) => {
          if (res.message === "success") {
            this.standByService.standBySubject.next(false);
          } else if (res.message === "incorrect_password") {
            this.snackMessageService.newMessage.next(
              new SnackMessage('danger',
               'Le mot de passe entré est incorrecte.'));
          }
        }, (err) => {
          this.snackMessageService.newMessage.next(
            new SnackMessage('danger',
             'Une erreur s\'est produite lors de l\'opération, réesseyez.'));
        }
      )
    }
  }

  connectToOtherAccount() {
    this.userService.logOutSubject.next(true);
  }

}
