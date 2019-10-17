import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsoleValidators } from './console.validators';
import { ConsoleService } from '../console.service';
import { SnackMessageService } from '../../shared/snack-messages/snack-message.service';
import { SnackMessage } from '../../shared/snack-messages/snack-message.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-console-form',
  templateUrl: './console-form.component.html',
  styleUrls: ['./console-form.component.scss']
})
export class ConsoleFormComponent implements OnInit {
  form: FormGroup;
  loadinf: boolean = false;
  @Input('formstate') formstate: any;
  @Input('console') console: any;
  @Output() onConsoleFormSubmit: EventEmitter<any> = new EventEmitter<any>(); 
  constructor(private fb: FormBuilder,
    private router: Router,
    private consoleService: ConsoleService,
     private consoleValidators: ConsoleValidators,
     private snackMessageService: SnackMessageService ) {
      this.form = this.fb.group ({
        name: [null , Validators.compose ([Validators.required, Validators.minLength(2)]),
          Validators.composeAsync([this.consoleValidators.uniqueNameValidator.bind(this.consoleValidators)])],
        _id: [null , Validators.compose ([])]
      });
   }

  ngOnInit() {
    if (this.formstate === 'show') {
      this.form.patchValue(this.console);
      this.form.disable();
    } else if (this.formstate === 'edit') {
      this.form.patchValue(this.console);
    }
  }

  submit() {
    this.form.disable();
    if (this.formstate === 'create') {
      this.consoleService.createConsole(this.form.value).subscribe(
        (res) => {
          this.snackMessageService.newMessage.next(
            new SnackMessage('success', 'L\'opération a été effectuée avec succès'));
          this.form.enable();
          this.router.navigate(['console', res.id, 'show']);
        }, (err) => {
          this.snackMessageService.newMessage.next(
            new SnackMessage('danger', 'Une erreur s\'est produite lors de l\'opération, réesseyez.'));
          this.form.enable();
        }
      )
    }
    if (this.formstate === 'edit') {
      this.consoleService.updateConsole(this.form.value).subscribe(
        (res) => {
          this.snackMessageService.newMessage.next(
            new SnackMessage('success', 'L\'opération a été effectuée avec succès'));
          this.form.enable();
          this.router.navigate(['console', res.id, 'show']);
        }, (err) => {
          this.snackMessageService.newMessage.next(
            new SnackMessage('danger', 'Une erreur s\'est produite lors de l\'opération, réesseyez.'));
          this.form.enable();
        }
      )
    }
  }

}
