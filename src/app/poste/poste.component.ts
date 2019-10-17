import { Component, OnInit } from '@angular/core';
import { PosteService } from './poste.service';
import { SnackMessageService } from '../shared/snack-messages/snack-message.service';
import { SnackMessage } from '../shared/snack-messages/snack-message.model';

@Component({
  selector: 'app-poste',
  templateUrl: './poste.component.html',
  styleUrls: ['./poste.component.scss']
})
export class PosteComponent implements OnInit {
  postes: any = [];
  loading = false;
  constructor(private posteService: PosteService, private snackMessageService: SnackMessageService) { }

  ngOnInit() {
    this.getPostes();
  }

  getPostes() {
    this.loading = true;
    this.posteService.gtPostes().subscribe(
      (res) => {
        this.postes = res;
        this.loading = false;
      }, (err) => {
        this.snackMessageService.newMessage.next(
          new SnackMessage('danger', 'Une erreur s\'est produite lors de l\'opération, réesseyez.'));
      }
    )
  }

}
