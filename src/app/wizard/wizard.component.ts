import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WizardService } from './wizard.service';

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
  constructor(private router: Router, private wizardService: WizardService) { }

  ngOnInit() {
  }

  endWizard() {
    window.localStorage.removeItem('activationDatail');
    this.router.navigate(['/', 'session', 'signin']);
  }

  onActivationSuccess(activationIds) {
      if (activationIds) {
        this.wizardService.activationIdShare.next(activationIds);
        this.activation = true;
      }
  }

  onInformationSuccess(e) {
    if (e) {
      this.information = true;
    }
  }

  onAccountSuccess(e) {
    if (e) {
      this.account = true;
    }
  }

}
