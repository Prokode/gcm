import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-tarif-create',
  templateUrl: './tarif-create.component.html',
  styleUrls: ['./tarif-create.component.scss']
})
export class TarifCreateComponent implements OnInit {
  consoles: any = [];
  console_id = null;
  constructor(private route: ActivatedRoute) { 
    this.console_id = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data: any) => {
        this.consoles = data['consoles'];
      }
    );
  }

}
