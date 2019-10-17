import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material';
import {SnackMessage} from '../snack-message.model';

@Component({
  selector: 'app-snack-message',
  templateUrl: './snack-message.component.html',
  styleUrls: ['./snack-message.component.scss']
})
export class SnackMessageComponent implements OnInit {

  constructor(public snackRef: MatSnackBarRef<SnackMessageComponent>,
              @Inject(MAT_SNACK_BAR_DATA) public snackMessage: SnackMessage) {
    console.log('SNACK_MESSAGE');
  }

  ngOnInit() {}

  onClose() {
    this.snackRef.dismiss();
  }

}
