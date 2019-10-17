import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-poste-create',
  templateUrl: './poste-create.component.html',
  styleUrls: ['./poste-create.component.scss']
})
export class PosteCreateComponent implements OnInit {
  consoles: any = [];
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: any) => {
        this.consoles = data['consoles'];
      }
    );
  }

}
