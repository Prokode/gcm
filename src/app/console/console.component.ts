import { Component, OnInit } from '@angular/core';
import { ConsoleService } from './console.service';
import { SnackMessageService } from '../shared/snack-messages/snack-message.service';
import { SnackMessage } from '../shared/snack-messages/snack-message.model';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {
  consoles: any = [];
  loading: boolean = false;
  temp: any = [];
  constructor(private consoleService: ConsoleService, private snackMessageService: SnackMessageService) { 
    this.getConsoles();
  }

  ngOnInit() {
  }

  getConsoles() {
    this.loading = true;
    this.consoleService.getConsoles().subscribe(
      (res) => {
        this.loading = false;
        this.consoles = res;
        this.temp = res;
      }
    );
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.consoles = temp;
  }

  onConsoleDelate(row) {
    if(confirm("Etes vous sûre de supprimer cette console")) { 
      this.consoleService.delateConsole({console_id: row._id}).subscribe(
        (res) => {
          this.snackMessageService.newMessage.next(
            new SnackMessage('success', 'L\'élément a été bien supprimé.'));
            this.getConsoles();
        }, (err) => {
          this.snackMessageService.newMessage.next(
            new SnackMessage('danger', 'Une erreur s\'est produite lors de l\'opération, réesseyez.'));
        }
      );
    }
  }

}
