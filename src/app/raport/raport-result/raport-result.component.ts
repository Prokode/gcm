import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {GlobalVariable} from '../../global';

@Component({
  selector: 'app-raport-result',
  templateUrl: './raport-result.component.html',
  styleUrls: ['./raport-result.component.scss']
})
export class RaportResultComponent implements OnInit {
  ventes: any = [];
  totalVente: number = 0;
  globals = GlobalVariable;
  query: any;
  stats: any = [];
  constructor(private router: Router) { }

  ngOnInit() {
    const reportData = JSON.parse(window.localStorage.getItem('report'));
    if (reportData) {
      this.ventes = reportData.ventes;
      this.query = reportData.query;
      this.stats = reportData.stats;
      this.getVentesTotal();
    } else {
      this.router.navigate(['/raport']);
    }
  }

  getVentesTotal() {
    this.totalVente = 0;
    this.ventes.forEach(vente => {
      this.totalVente = this.totalVente + Number(vente.tarif.cost);
    });
    return this.totalVente;
  }

}
