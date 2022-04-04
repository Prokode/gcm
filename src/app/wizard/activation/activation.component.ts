import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WizardService } from '../wizard.service';
import { ActivationService } from '../../shared/activation/activation.service';
import { SnackMessageService } from '../../shared/snack-messages/snack-message.service';
import { SnackMessage } from '../../shared/snack-messages/snack-message.model';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent implements OnInit {
  form: FormGroup;
  @Output() onActivationSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Input('state') state: string = 'activation';
  code_recover: any = null;
  loading: boolean = false;
  reactivationForm: FormGroup;
  countries = [
    {lib: 'TOGO', code: '00228'},
    {lib: 'BENIN', code: '00229'}
  ];
  countryCode: any = '00228';

  constructor(private fb: FormBuilder, private wizardService: WizardService,
     private snackMessageService : SnackMessageService,
     private activationService: ActivationService) {
    this.form = this.fb.group ( {
      activationCode: [null , Validators.compose ( [ Validators.required ] )]
    } );

    this.reactivationForm = this.fb.group ({
      country:  [this.countries[0], Validators.compose ( [ Validators.required ])],
      phone:  [null , Validators.compose ([ Validators.required ]),
       Validators.composeAsync([])],
      activationCode: [null , Validators.compose ( [ Validators.required ] )]
    });

    this.reactivationForm.controls['country'].valueChanges.subscribe(
      (value) => {
        this.countryCode = value.code;
      }
    );

   }

  ngOnInit() {
  }

  submit() {
    this.loading = true;
    this.wizardService.getMacAddress().subscribe(
      (res) => {
        this.activationService.postActivation({mac: res.mac, code: this.form.value.activationCode}).subscribe(
          (response) => {
            if (response.message === 'success') {
              this.activationService.registerLocalActivation(response).subscribe(
                (response2) => {
                  this.loading = false;
                  this.snackMessageService.newMessage.next(
                    new SnackMessage('success', 'L\'activation s\'est effectuée avec succès.'));
                  // this.code_recover = response.rcode;
                  this.form.disable();
                  this.onActivationSuccess.emit({
                    id: response.id,
                    history: response.history,
                    rp: response.rp
                  });
                }, (err) => {
                  this.loading = false;
                  console.log(err);
                }
              );
            } else if (response.message === 'used code') {
              this.loading = false;
              this.snackMessageService.newMessage.next(
                new SnackMessage('danger', 'Le code d\'activation entré a été déjà utilisé par un autre client.'));
            } else if (response.message === 'bad code') {
              this.loading = false;
              this.snackMessageService.newMessage.next(
                new SnackMessage('danger', 'Le code entré est incorrect.'));
            } else if (response.message === 'code has expired') {
              this.loading = false;
              this.snackMessageService.newMessage.next(
                new SnackMessage('danger', 'Le code entré est expiré.'));
            }
          }, (err) => {
            this.loading = false;
            console.log(err);
          }
        );
      }
    )
  }
  reformatReactivationData() {
    const form = this.reactivationForm.value;
    return {
      code: this.countryCode,
      phone: form.phone,
      activationCode: form.activationCode
    }
  }
  reactivationSubmit() {
    this.loading = true;
    const form = this.reactivationForm.value;
    this.wizardService.getMacAddress().subscribe(
      (res) => {
        this.activationService.updateActivation({
          mac: res.mac,
          phoneCode: this.countryCode,
          phone: form.phone,
          code: form.activationCode
        }).subscribe(
          (response) => {
            if (response.message === 'success') {
              this.activationService.registerLocalActivation(response).subscribe(
                (response2) => {
                  this.loading = false;
                  this.snackMessageService.newMessage.next(
                    new SnackMessage('success', 'La réactivation s\'est effectuée avec succès.'));
                    // this.code_recover = response.rcode;
                    this.form.disable();
                    this.onActivationSuccess.emit({
                      id: response.id,
                      history: response.history
                    });
                }, (err) => {
                  this.loading = false;
                  console.log(err);
                }
              );
            } else if (response.message === 'used code') {
              this.loading = false;
              this.snackMessageService.newMessage.next(
                new SnackMessage('danger', 'Le code d\'activation entré a été déjà utilisé par un autre client.'));
            } else if (response.message === 'bad code') {
              this.loading = false;
              this.snackMessageService.newMessage.next(
                new SnackMessage('danger', 'Le code entré est incorrect.'));
            } else if (response.message === 'user_not_found') {
              this.loading = false;
              this.snackMessageService.newMessage.next(
                new SnackMessage('danger', 'Aucun utilisateur n\'a été trouvé pour ce numéro.'));
            } else if (response.message === 'code has expired') {
              this.loading = false;
              this.snackMessageService.newMessage.next(
                new SnackMessage('danger', 'Le code entré est expiré.'));
            }
          }, (err) => {
            this.loading = false;
            console.log(err);
          }
        );
      }); 
  }
}
