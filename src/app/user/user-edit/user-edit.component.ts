import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLoggedService } from '../user-logged.service';
import { SnackMessageService } from '../../shared/snack-messages/snack-message.service';
import { SnackMessage } from '../../shared/snack-messages/snack-message.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user: any = null;
  new_password:any  = null;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private snackMessageService: SnackMessageService,
     private userLoggedService: UserLoggedService) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: any) => {
        this.user = data['user'];
      }
    );
  }

  disableUser() {
    if (confirm("Vous voulez continuer l'opération ?")) {
      this.userLoggedService.disableUser({id: this.user._id}).subscribe(
        (res) => {
          if (res.message === 'success') {
            this.snackMessageService.newMessage.next(
              new SnackMessage('success',
               'L\'utilisateur a été désactivé.'));
            this.router.navigate(['user']);
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

  activateUser() {
    if (confirm("Vous voulez continuer l'opération ?")) {
      this.userLoggedService.activateUser({id: this.user._id}).subscribe(
        (res) => {
          if (res.message === 'success') {
            this.snackMessageService.newMessage.next(
              new SnackMessage('success',
               'L\'utilisateur a été activé avec succès.'));
            this.router.navigate(['user']);
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

  reInitPassword() {
    if (confirm("Vous voulez continuer l'opération ?")) {
      this.userLoggedService.reInitPassword({id: this.user._id}).subscribe(
        (res) => {
          if (res.message === 'success') {
            this.new_password = res.password;
            this.snackMessageService.newMessage.next(
              new SnackMessage('success',
               'Le mot de passe de l\'utilisateur a été réinitialisé avec succès.'));
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
