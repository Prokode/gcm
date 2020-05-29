import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnackMessageService } from '../../shared/snack-messages/snack-message.service';
import { ActivationService } from '../../shared/activation/activation.service';
import { PosteService } from '../poste.service';
import { SnackMessage } from '../../shared/snack-messages/snack-message.model';

@Component({
  selector: 'app-poste-code-form',
  templateUrl: './poste-code-form.component.html',
  styleUrls: ['./poste-code-form.component.scss']
})
export class PosteCodeFormComponent implements OnInit {
  form: FormGroup;
  @Input('state') state: string;
  @Output() onActivationSumitted: EventEmitter<any> = new EventEmitter<any>();
  constructor(private fb: FormBuilder, private snackMessageService: SnackMessageService,
    private activationService: ActivationService, private posteService: PosteService) {
      this.form = this.fb.group ({
        code: [null , Validators.compose ([Validators.required]),
          Validators.composeAsync([])]
      });
   }

  ngOnInit() {
  }

  submitPosteActivation() {
    this.form.disable();
    this.activationService.getActivation().subscribe(
      (res) => {
        if (res.token) {
          this.posteService.postOnlinePosteActivation({
            code: this.form.getRawValue().code,
            token: res.token
          }).subscribe(
            (res) => {
              if (res.message === 'success') {
                this.posteService.postLocalPosteActivation(res).subscribe(
                  (res) => {
                    if (res.message === 'success') {
                      this.snackMessageService.newMessage.next(
                        new SnackMessage('success',
                         'L\'activation des postes a été effectuée avec succès.'));
                      this.onActivationSumitted.emit(true);
                    } else {
                      this.form.enable();
                      this.snackMessageService.newMessage.next(
                        new SnackMessage('danger',
                         'Une erreur s\'est produite lors de l\'opération, réesseyez.'));
                    }
                  }, (err) => {
                    this.form.enable();
                    this.snackMessageService.newMessage.next(
                      new SnackMessage('danger', 'Une erreur s\'est produite lors de l\'opération, réesseyez.'));
                  }
                );
              } else if (res.message === 'Code_is_used') {
                this.form.enable();
                this.snackMessageService.newMessage.next(
                  new SnackMessage('danger', 'Le code entré a été déjà utilisé'));
              }  else if (res.message === 'Code_is_incorrect') {
                this.form.enable();
                this.snackMessageService.newMessage.next(
                  new SnackMessage('danger', 'Le code entré est incorrect'));
              }  else if (res.message === 'Activation_error') {
                this.form.enable();
                this.snackMessageService.newMessage.next(
                  new SnackMessage('danger', 'Une erreur de l\'activation du produit'));
              } 
            }, (err) => {
              this.form.enable();
              this.snackMessageService.newMessage.next(
                new SnackMessage('danger', 'Une erreur s\'est produite lors de l\'opération, réesseyez.'));
            }
          )
        }
      }, (err) => {
        this.form.enable();
        this.snackMessageService.newMessage.next(
          new SnackMessage('danger', 'Une erreur s\'est produite lors de l\'opération, réesseyez.'));
      }
    );
  }

}
