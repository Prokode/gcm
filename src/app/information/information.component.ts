import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { InformationService } from './information.service';
import { SnackMessageService } from '../shared/snack-messages/snack-message.service';
import { SnackMessage } from '../shared/snack-messages/snack-message.model';
import { AppService } from '../app.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  user: any;
  form: FormGroup;
  onModificate = false;
  constructor(private route: ActivatedRoute, private fb: FormBuilder,
    private appService: AppService,
    private informationService: InformationService, private snackMessageService: SnackMessageService) { 
    this.form = this.fb.group ({
      lastname: [null , Validators.compose ( [ Validators.required ] )],
      firstname: [null , Validators.compose ( [ Validators.required ] )],
      username: [null , Validators.compose ( [ Validators.required ] ),
       Validators.composeAsync([]) ],
      role: [null , Validators.compose ( [ Validators.required ] )],
      _id: [null , Validators.compose ( [ Validators.required ] )],
      society: [null , Validators.compose ( [ ] )],
    });
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data: any) => {
        this.user = data['user'];
        this.form.patchValue(this.user);
        if (this.user.role === 'ADMIN') {
          this.form.controls['society'].setValidators(Validators.required);
        }
        this.form.disable();
      }
    );
  }
  
  activateModification() {
    this.onModificate = !this.onModificate;
    if(this.onModificate) {
      this.form.enable();
      this.form.controls['username'].disable();
      this.form.controls['role'].disable();
      
    } else {
      this.form.disable();
    }
  }

  submit() {
    this.form.disable();
    this.informationService.updateUser(this.form.getRawValue()).subscribe(
      (res) => {
        if (res.message === "success") {
          this.appService.userInfoChange.next(true);
          this.snackMessageService.newMessage.next(
            new SnackMessage('success', 'Les informations ont été bien modifiées.'));
            this.showUser();
        }
      }, (err) => {
        this.form.enable();
        this.form.controls['username'].disable();
        this.form.controls['role'].disable();
        this.snackMessageService.newMessage.next(
          new SnackMessage('danger', 'Une erreur s\'est produite, veuillez réesseyer.'));
      }
    );
  }

  showUser() {
    this.informationService.showUser().subscribe(
      (user) => {
        this.user = user;
        this.form.patchValue(this.user);
        this.form.disable();
        this.onModificate = !this.onModificate;
      }
    )
  }

}
