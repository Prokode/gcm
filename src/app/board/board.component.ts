import { Component, OnInit } from '@angular/core';
import { BoardService } from './board.service';
import { SnackMessageService } from '../shared/snack-messages/snack-message.service';
import { SnackMessage } from '../shared/snack-messages/snack-message.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  boards: any = [];
  loading: boolean = false;
  temp: any = [];
  constructor(private boardService: BoardService , private snackMessageService: SnackMessageService) { 
    this.getBoards();
  }

  ngOnInit() {
  }

  getBoards() {
    this.loading = true;
    this.boardService.getBoards().subscribe(
      (res) => {
        this.loading = false;
        this.boards = res;
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
    this.boards = temp;
  }

  onBoardDelate(row) {
    if(confirm("Etes vous sûre de supprimer cette carte")) { 
      this.boardService.delateConsole({console_id: row._id}).subscribe(
        (res) => {
          this.snackMessageService.newMessage.next(
            new SnackMessage('success', 'L\'élément a été bien supprimé.'));
            this.getBoards();
        }, (err) => {
          this.snackMessageService.newMessage.next(
            new SnackMessage('danger', 'Une erreur s\'est produite lors de l\'opération, réesseyez.'));
        }
      );
    }
  }
}
