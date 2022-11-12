import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoardValidators } from './board.validators';
import { SnackMessageService } from '../../shared/snack-messages/snack-message.service';
import { SnackMessage } from '../../shared/snack-messages/snack-message.model';
import { Router } from '@angular/router';
import {GlobalVariable} from '../../global';
import { BoardService } from '../board.service';
import { IpcService } from '../../shared/ipc/ipc.service';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.scss']
})
export class BoardFormComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  @Input('formstate') formstate: any;
  @Input('board') board: any;
  @Output() onBoardFormSubmit: EventEmitter<any> = new EventEmitter<any>(); 

  operationModes = [
    'com',
    'ip'
  ];

  comBaudRates = [
    300, 600, 1200, 2400, 4800, 9600, 14400, 19200, 28800, 31250, 38400, 57600, 115200
  ];

 

  constructor(private fb: FormBuilder,
    private router: Router,
    private boardService: BoardService,
    private boardValidators: BoardValidators ,
    private snackMessageService: SnackMessageService,
    private readonly _ipc: IpcService ) {

      this.form = this.fb.group ({
        name: [null , Validators.compose ([Validators.required,  Validators.minLength(2)]),
          Validators.composeAsync([this.boardValidators.uniqueNameValidator.bind(this.boardValidators)])],
        operation_mode: [null , Validators.compose ([ Validators.required ])],  
        com: [null , Validators.compose ([]),
        Validators.composeAsync([])],  
        comBaudRate:  [9600 , Validators.compose ([])],
        ip: [null , Validators.compose ([ ]),
        Validators.composeAsync([])],  
        _id: [null , Validators.compose ([])],
        available: [false , Validators.compose ([ Validators.required ])]
      });

    }

  ngOnInit() {
    if (this.formstate === 'show') {
      this.form.patchValue(this.board);
      this.form.disable();
    } else if (this.formstate === 'edit') {
      this.form.patchValue(this.board);
      this.onOperationModeChange(null);
    }
  }

  submit() {
    this.form.disable();
    if (this.formstate === 'create') {
      this.boardService.createBoard(this.form.value).subscribe(
        (res) => {
          this.snackMessageService.newMessage.next(
            new SnackMessage('success', 'L\'opération a été effectuée avec succès, l\'application va rédémarrer.'));
          // this.form.enable();
          // this.router.navigate(['board', res.id, 'show']);
          // this.router.navigate(['board']);
          this._ipc.send('reload_app');
        }, (err) => {
          this.snackMessageService.newMessage.next(
            new SnackMessage('danger', 'Une erreur s\'est produite lors de l\'opération, réesseyez.'));
          this.form.enable();
          this.onOperationModeChange(null);
        }
      )
    }
    if (this.formstate === 'edit') {
      this.boardService.updateBoard(this.form.value).subscribe(
        (res) => {
          this.snackMessageService.newMessage.next(
            new SnackMessage('success', 'L\'opération a été effectuée avec succès, l\'application va rédémarrer.'));
          // this.form.enable();
          // this.router.navigate(['board']);
          this._ipc.send('reload_app');
        }, (err) => {
          this.snackMessageService.newMessage.next(
            new SnackMessage('danger', 'Une erreur s\'est produite lors de l\'opération, réesseyez.'));
          this.form.enable();
          this.onOperationModeChange(null);
        }
      )
    }
  }

  onOperationModeChange(evt) {
    this.form.controls['com'].enable();
    this.form.controls['comBaudRate'].enable();
    this.form.controls['ip'].enable();
    this.form.controls['com'].setValidators(null);
    this.form.controls['ip'].setValidators(null);
    if (this.form.value.operation_mode === 'com') {
      this.form.controls['com'].setValidators(Validators.required);
      this.form.controls['comBaudRate'].setValidators(Validators.required);
      this.form.controls['ip'].disable();
    } else if (this.form.value.operation_mode === 'ip')  {
      this.form.controls['ip'].setValidators(Validators.required);
      this.form.controls['com'].disable();
      this.form.controls['comBaudRate'].disable();
    }
  }

  testBoard() {
    this.form.disable();
    this.boardService.testBoard(this.form.value).subscribe(
      (res) => {
        
        this.snackMessageService.newMessage.next(
          new SnackMessage('success', 'La carte est bien disponible, vous pouvez continuer'));
        this.form.enable();
        this.form.controls['available'].setValue(true);
        this.onOperationModeChange(null);
        // this.router.navigate(['board', res.id, 'show']);
       //  this.router.navigate(['board']);

      }, (err) => {
        this.form.controls['available'].setValue(false);
        this.snackMessageService.newMessage.next(
          new SnackMessage('danger', 'Carte non disponible.'));
        this.form.enable();
        this.onOperationModeChange(null);
      }
    )
  }

}
