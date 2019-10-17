import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tarif-edit',
  templateUrl: './tarif-edit.component.html',
  styleUrls: ['./tarif-edit.component.scss']
})
export class TarifEditComponent implements OnInit {
  consoles: any = [];
  tarif: any = null;
  console_id = null;
  constructor(private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data: any) => {
        this.consoles = data['consoles'];
        this.tarif = data['tarif'];
        this.console_id = this.tarif.console_id;
      }
    );
  }

}
