import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WizardService} from '../wizard.service';
import {SnackMessageService} from "../../shared/snack-messages/snack-message.service";
import { SnackMessage } from '../../shared/snack-messages/snack-message.model';
import { InformationValidators } from './information.validators';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  form: FormGroup;
  recoverForm: FormGroup;
  countries = [
    {lib: 'TOGO', code: '00228'},
    {lib: 'BENIN', code: '00229'}
  ];
  activationId: any = null;
  @Output() onInformationSuccess: EventEmitter<any> = new EventEmitter<any>(); 
  countryCode: any = '00228';
  historyId: any = null;
  recover: boolean = false;
  userRecovered: any = null;
  constructor(private fb: FormBuilder, private wizardService: WizardService,
              private snackMessageService : SnackMessageService, private informationValidators: InformationValidators ) {
    this.form = this.fb.group ( {
      lastname: [null , Validators.compose ( [ Validators.required ] )],
      firstname: [null , Validators.compose ( [ Validators.required ] )],
      address:  [null , Validators.compose ( [] )],
      country:  [this.countries[0], Validators.compose ( [ Validators.required ])],
      phone:  [null , Validators.compose ([ Validators.required ]),
       Validators.composeAsync([ 
         this.informationValidators.uniquePhoneValidator.bind(this.informationValidators) ]) ]
    });

    this.recoverForm = this.fb.group ({
      country:  [this.countries[0], Validators.compose ( [ Validators.required ])],
      phone:  [null , Validators.compose ([ Validators.required ]),
       Validators.composeAsync([ ])]
    });

    this.form.controls['country'].valueChanges.subscribe(
      (value) => {
        this.countryCode = value.code;
      }
    );

    this.recoverForm.controls['country'].valueChanges.subscribe(
      (value) => {
        this.countryCode = value.code;
      }
    );

    this.wizardService.activationIdShare.asObservable().subscribe(
      (ids) => {
        console.log(ids);
        this.activationId = ids.id;
        this.historyId = ids.history;
      }
    )
  }

  ngOnInit() {
  }
 
  reformatData = (isFor = 'form') => {
    let form = null;
    if (isFor === 'form') {
      form = this.form.value;
    } else if (isFor === 'recover') {
      form = this.recoverForm.value;
    }
    return {
      lastname: form.lastname,
      firstname: form.firstname,
      address: form.address,
      country: form.country.lib,
      phone: form.phone,
      activationId: this.activationId,
      countryCode: this.countryCode,
      historyId: this.historyId
    }
  }

  submit() {
    const data = this.reformatData();
      this.wizardService.registerUser(data).subscribe(
        (res) => {
          if (res.message === 'success') {
            this.form.disable();
            this.snackMessageService.newMessage.next(
              new SnackMessage('success', 'Vos informations ont été bien enrégistrées'));
            this.onInformationSuccess.emit(true);
          }
        },
        (err) => {
          this.snackMessageService.newMessage.next(
            new SnackMessage('danger', 'Une erreur s\'est produite, réesseyez s\'il vous plaît.'));
        }
      );
  }

  recoverSubmit() {
    this.userRecovered = null;
    const data = this.reformatData('recover');
    this.wizardService.recoverUser(data).subscribe(
      (res) => {
        if (res.message === 'success') {
          this.userRecovered = res.user;
          // this.recoverForm.disable();
          // this.snackMessageService.newMessage.next(
          //   new SnackMessage('success', 'Vos informations ont été bien enrégistrées'));
          // this.onInformationSuccess.emit(true);
        } else if (res.message === 'user_not_found') {
          this.snackMessageService.newMessage.next(
            new SnackMessage('danger', 'Aucun utilisateur n\'est attribué à ce numéro, revoyez le numéro  de téléhpne.'));
        }
      },
      (err) => {
        this.snackMessageService.newMessage.next(
          new SnackMessage('danger', 'Une erreur s\'est produite, réesseyez s\'il vous plaît.'));
      }
    );
  }

  toggleRecover() {
    this.recover = !this.recover;
  }

  confirmUserRecovered() {
    const data = this.reformatData('recover');
    this.wizardService.confirmUserRecovered(data).subscribe(
      (res) => {
        if (res.message === 'success') {
          this.recoverForm.disable();
          this.snackMessageService.newMessage.next(
            new SnackMessage('success', 'Vos informations ont été bien enrégistrées'));
          this.onInformationSuccess.emit(true);
        }
      },
      (err) => {
        this.snackMessageService.newMessage.next(
          new SnackMessage('danger', 'Une erreur s\'est produite, réesseyez s\'il vous plaît.'));
      }
    );
  }

}
