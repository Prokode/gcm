import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-poste-edit',
  templateUrl: './poste-edit.component.html',
  styleUrls: ['./poste-edit.component.scss']
})
export class PosteEditComponent implements OnInit {
  consoles: any = [];
  boards: any = [];
  poste:  any = null;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: any) => {
        this.consoles = data['consoles'];
        this.boards = data['boards'];
        this.poste = data['poste'];
      }
    );
  }

}
