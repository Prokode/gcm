import { Component, OnInit } from '@angular/core';
import { WizardService } from '../wizard/wizard.service';
import { Router } from '@angular/router';
import { SnackMessageService } from '../shared/snack-messages/snack-message.service';
import { SnackMessage } from '../shared/snack-messages/snack-message.model';
import { LocalService } from '../shared/local/local.service';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.scss']
})
export class LocalComponent implements OnInit {
  loading = false;
  countTime = null;
  constructor(private wizardService: WizardService, 
    private localService: LocalService,
    private router: Router, private snackMessageService: SnackMessageService) { }

  ngOnInit() {
  }

  postLocalCurrentDataTime(cdt) {
    this.wizardService.postLocalDateTime({cdt: cdt}).subscribe(
      (res) => {
        if (res.message === 'success') {
          
        }
      }, (err) => {
        this.loading = false;
        this.snackMessageService.newMessage.next(
          new SnackMessage('danger', 'Une erreur s\'est produite, veuillez réesseyer.'));
      }
    );
  }

  dateAndTimeTest() {
    this.loading = true;
    this.localService.getLocalConfig().subscribe(
      (res) => {
        this.loading = false;
        this.countTime = 5;
        setInterval(() => {
          this.countTime = this.countTime - 1;
          if (this.countTime === 0) {
            this.router.navigate(['/']);
          } 
        }, 1000);
      }, (err) => {
        this.loading = false;
        this.snackMessageService.newMessage.next(
          new SnackMessage('danger', 'Une erreur s\'est produite, veuillez réesseyer.'));
      }
    );
  }

}
