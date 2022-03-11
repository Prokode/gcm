import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PosteService } from '../poste.service';
import { SnackMessageService } from '../../shared/snack-messages/snack-message.service';
import { SnackMessage } from '../../shared/snack-messages/snack-message.model';
import { Router } from '@angular/router';
import { PosteValidators } from '../poste.validators';

@Component({
  selector: 'app-poste-form',
  templateUrl: './poste-form.component.html',
  styleUrls: ['./poste-form.component.scss']
})
export class PosteFormComponent implements OnInit {
  form: FormGroup;
  @Input('formstate') formstate: any;
  @Input('consoles') consoles: any;
  @Input('boards') boards: any;
  @Input('newPosteName') newPosteName: any;

  @Input('poste') poste: any;

  constructor(private fb: FormBuilder, 
    private snackMessageService: SnackMessageService,
    private router: Router, private posteValidators: PosteValidators,
    private posteService: PosteService) {
    this.form = this.fb.group ({
      name: [null , Validators.compose ([Validators.required, Validators.minLength(2)])],
      console_id: [null , Validators.compose ([Validators.required])],
      board_id: [null , Validators.compose ([Validators.required])],
      arduino_pin: [null , Validators.compose([Validators.required, this.arduinoPinValidator.bind(this)]),
       Validators.composeAsync([ this.posteValidators.arduinoPinValidator.bind(this.posteValidators) ])],
      _id: [null , Validators.compose ([])]
    });
   }

  ngOnInit() {
    if (this.formstate === 'create') {
      this.form.controls['name'].setValue(this.newPosteName);
      this.form.controls['name'].disable();
    } else if (this.formstate === 'show') {
      this.form.patchValue(this.poste);
      this.form.disable();
    } else if (this.formstate === 'edit') {
      this.form.patchValue(this.poste);
      this.form.controls['name'].disable();
    }
  }

  arduinoPinValidator(control: FormControl) {
    if (control.value) {
      const fieldLength = control.value.toString().length;
      if (fieldLength > 2) {
        return {
          maxlength: true
        }
      } else {
        return false;
      }
    }
  }

  submit() {
    if (this.formstate === 'create') {
      this.posteService.createPoste(this.form.getRawValue()).subscribe(
        (res) => {
          if (res.message === 'success') {
            this.snackMessageService.newMessage.next(
              new SnackMessage('success',
               'Le poste a été bien créé'));
               this.router.navigate(['/poste/' + res.id + '/show']);
          } else {
            this.snackMessageService.newMessage.next(
              new SnackMessage('danger',
               'Une erreur s\'est produite lors de l\'opération, réesseyez.'));
          }
        }, (err) => {
          this.snackMessageService.newMessage.next(
            new SnackMessage('danger',
             'Une erreur s\'est produite lors de l\'opération, réesseyez.'));
        }
      );
    } else if (this.formstate === 'edit') {
      this.posteService.updatePoste(this.form.getRawValue()).subscribe(
        (res) => {
          if (res.message === 'success') {
            this.snackMessageService.newMessage.next(
              new SnackMessage('success',
               'Le poste a été bien mise à jour'));
              this.router.navigate(['/poste/' + res.id + '/show']);
          } else {
            this.snackMessageService.newMessage.next(
              new SnackMessage('danger',
               'Une erreur s\'est produite lors de l\'opération, réesseyez.'));
          }
        }, (err) => {
          this.snackMessageService.newMessage.next(
            new SnackMessage('danger',
             'Une erreur s\'est produite lors de l\'opération, réesseyez.'));
        }
      );
    }
  }

}
