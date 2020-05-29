import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivationService } from '../shared/activation/activation.service';
import { SnackMessageService } from '../shared/snack-messages/snack-message.service';
import { SnackMessage } from '../shared/snack-messages/snack-message.model';
import { WizardService } from '../wizard/wizard.service';
import { LicenceService } from './licence.service';

@Component({
  selector: 'app-licence',
  templateUrl: './licence.component.html',
  styleUrls: ['./licence.component.scss']
})
export class LicenceComponent implements OnInit {
  licence: any = null;
  form: FormGroup;
  loading = false;
  licence_time_rest: any = 0;
  constructor(private route: ActivatedRoute,
    private activationService: ActivationService,
    private snackMessageService: SnackMessageService,
    private wizardService: WizardService,
    private licenceService: LicenceService,
    private fb: FormBuilder) { 
    this.form = this.fb.group ({
      code: [null , Validators.compose ([Validators.required]),
        Validators.composeAsync([])]
    });
  }

  ngOnInit() {
     this.route.data.subscribe(
      (data: any) => {
        this.licence = data['licence'];
        this.licence_time_rest = this.formatToDate(this.licence.details.activation.end).getTime() - (new Date()).getTime();
        this.licence_time_rest = Number(this.licence_time_rest / (1000 * 60 * 60 * 24));
        console.log(this.licence);
      }
    );
  }

  formatToDate(d) {
    return new Date(d);
  }

  submit() {
    this.form.disable();
    this.wizardService.getMacAddress().subscribe(
      (wiz) => {
        this.activationService.getActivation().subscribe(
          (res) => {
            if (res.token) {
              this.activationService.postReActivation({mac: wiz.mac, code: this.form.getRawValue().code, token: res.token}).subscribe(
                (response) => {
                  if (response.message === 'success') {
                      this.activationService.registerLocalActivation(response).subscribe(
                        (response2) => {
                          this.snackMessageService.newMessage.next(
                            new SnackMessage('success', 'Le prolongement de votre licence s\'est effectué avec succès.'));
                            this.form.enable();
                            this.form.reset();
                            this.getLicence();

                        }, (err) => {
                          console.log(err);
                        }
                      );
                  } else if (response.message === 'used code') {
                    this.form.enable();
                    this.snackMessageService.newMessage.next(
                      new SnackMessage('danger', 'Le code d\'activation entré a été déjà utilisé par un autre client.'));
                  } else if (response.message === 'bad code') {
                    this.form.enable();
                    this.snackMessageService.newMessage.next(
                      new SnackMessage('danger', 'Le code entré est incorrect.'));
                  } else if (response.message === 'code has expired') {
                    this.form.enable();
                    this.snackMessageService.newMessage.next(
                      new SnackMessage('danger', 'Le code entré est expiré.'));
                  } else if (response.message === 'Activation_error') {
                    this.form.enable();
                    this.snackMessageService.newMessage.next(
                      new SnackMessage('danger', 'Une erreur avec votre ancienne licence, réesseyez s\'il vous plaît.'));
                  } else if (response.message === 'Code_is_incorrect') {
                    this.form.enable();
                    this.snackMessageService.newMessage.next(
                      new SnackMessage('danger', 'Le code entré est incorrecte.'));
                  }
                }, (err) => {
                  this.form.enable();
                  this.snackMessageService.newMessage.next(
                    new SnackMessage('danger', 'Une erreur s\'est produite, réesseyez s\'il vous plaît.'));
                }
              )
            }
        });  
      }
    )
  }

  getLicence() {
    this.licenceService.getLicence().subscribe(
      (licence) => {
        this.licence = licence;
        this.licence_time_rest = this.formatToDate(this.licence.details.activation.end).getTime() - (new Date()).getTime();
        this.licence_time_rest = Number(this.licence_time_rest / (1000 * 60 * 60 * 24));
      }
    );
  }

}
