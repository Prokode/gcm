import { Component, OnInit } from '@angular/core';
import { TarifService } from './tarif.service';
import { Router } from '@angular/router';
import { SnackMessageService } from '../shared/snack-messages/snack-message.service';
import { SnackMessage } from '../shared/snack-messages/snack-message.model';

@Component({
  selector: 'app-tarif',
  templateUrl: './tarif.component.html',
  styleUrls: ['./tarif.component.scss']
})
export class TarifComponent implements OnInit {
  tarifs: any = [];
  temp: any = [];
  constructor(private tarifService: TarifService,
    private snackMessageService: SnackMessageService,
     private router: Router ) { }

  ngOnInit() {
    this.getTarifs();
  }

  getTarifs() {
    this.tarifService.getTarifs().subscribe(
      (res) => {
        this.tarifs = res;
        this.temp = res;
      }
    );
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.console.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.tarifs = temp;
  }

  createTarif(row) {
    this.router.navigate([ 'tarif', row.console._id, 'create']);
  }

  onTarifDelate(tarif) {
    if (confirm("Etes-vous sûre de supprimer l'élément ?")) {
      this.tarifService.delateTarif(tarif).subscribe(
        (res) => {  
          this.snackMessageService.newMessage.next(
            new SnackMessage('success', 'L\'élément a été supprimé avec succès.'));
            this.getTarifs();
        }, (err) => {
          this.snackMessageService.newMessage.next(
            new SnackMessage('danger', 'Une erreur s\'est produite lors de l\'opération, réesseyez.'));
        }
      )
    }
  }

}
