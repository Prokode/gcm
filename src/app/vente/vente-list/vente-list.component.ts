import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VenteService } from '../vente.service';
import {GlobalVariable} from '../../global';

@Component({
  selector: 'app-vente-list',
  templateUrl: './vente-list.component.html',
  styleUrls: ['./vente-list.component.scss']
})
export class VenteListComponent implements OnInit {
  ventes: any = [];
  loading: boolean = false;
  totalVente: number = 0;
  globals = GlobalVariable;
  constructor(private venteService: VenteService) { }

  ngOnInit() {
    this.getVentes();
  }

  getVentes() {
    this.loading = true;
    this.venteService.getVenteList().subscribe(
      (res) => {
        if (res.message === 'success') {
          this.ventes = res.ventes;
          this.getVentesTotal();
          this.loading = false;
        }
      }
    );
  }

  getVentesTotal() {
    this.totalVente = 0;
    this.ventes.forEach(vente => {
      this.totalVente = this.totalVente + Number(vente.tarif.cost);
    });
    return this.totalVente;
  }

}
