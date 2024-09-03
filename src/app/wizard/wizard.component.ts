import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WizardService } from './wizard.service';
import { SnackMessageService } from '../shared/snack-messages/snack-message.service';
import { SnackMessage } from '../shared/snack-messages/snack-message.model';
import { MatDialog, MatDialogRef } from '@angular/material';
import { TermesDialogComponent } from './termes-dialog/termes-dialog.component';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {
  activation = false;
  information = false;
  account = false;
  activationId = null;
  root_pwd = null;
  society: any = null;

  dialogRef: MatDialogRef< TermesDialogComponent > | null;
  config = {
    disableClose: false,
    panelClass: 'custom-overlay-pane-class',
    hasBackdrop: true,
    backdropClass: '',
    width: '80%',
    height: '70%',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    },
    data: {}
  };

  acceptTermes = false;

  constructor(private router: Router,
    private dialog: MatDialog,
    private snackMessageService: SnackMessageService,
    private wizardService: WizardService) { }

  ngOnInit() {
  }

  postLocalCurrentDataTime(cdt) {
    this.wizardService.postLocalDateTime({cdt: cdt}).subscribe(
      (res) => {
        if (res.message === 'success') {
          window.localStorage.removeItem('activationDatail');
          this.router.navigate(['/', 'session', 'signin']);
        }
      }, (err) => {
        this.snackMessageService.newMessage.next(
          new SnackMessage('danger', 'Une erreur s\'est produite, veuillez réesseyer.'));
      }
    );
  }

  endWizard() {
    this.wizardService.getLocalDateTime().subscribe(
      (res) => {
        if (res.currentDateTime) {
          this.postLocalCurrentDataTime(res.currentDateTime);
        }
      }, (err) => {
        this.postLocalCurrentDataTime(null);
      }
    );
  }

  onActivationSuccess(activationIds) {
      if (activationIds) {
        this.root_pwd = activationIds.rp;
        this.wizardService.activationIdShare.next(activationIds);
        this.activation = true;
      }
  }

  onInformationSuccess(e) {
    if (e) {
      this.wizardService.societyShare.next(e.society);
      this.wizardService.currencyShare.next(e.currency);
      this.wizardService.rootPasswordShare.next(this.root_pwd);
      this.information = true;
    }
  }

  onAccountSuccess(e) {
    if (e) {
      this.account = true;
    }
  }

  showTermes() {
    this.dialogRef = this.dialog.open( TermesDialogComponent, this.config);
    this.dialogRef.afterClosed().subscribe((data) => {
      if (data) {
      }
    });
  }

}
