import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-poste-show',
  templateUrl: './poste-show.component.html',
  styleUrls: ['./poste-show.component.scss']
})
export class PosteShowComponent implements OnInit {
  consoles: any = [];
  poste:  any = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: any) => {
        this.consoles = data['consoles'];
        this.poste = data['poste'];
      }
    );
  }

}
