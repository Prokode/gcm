import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-vente-current',
  templateUrl: './vente-current.component.html',
  styleUrls: ['./vente-current.component.scss']
})
export class VenteCurrentComponent implements OnInit {
  postes: any = [];
  constructor(private route: ActivatedRoute, 
    private socket: Socket ) {
      
      this.socket.fromEvent("broadcast").subscribe(
        (data: any) => {
          if (data.message === 'clock_refresh') {
            this.postes.forEach(poste => {
              if (poste.poste._id === data.poste._id) {
                poste.time = data.time;
                poste.tarif = data.tarif;
                poste.timems = data.timems;
              }
            });
          } else if (data.message === 'clock_end') {
            this.postes.forEach((poste, index) => {
              if (poste.poste._id === data.poste._id) {
                poste.time = null;
                poste.tarif = null;
                poste.timems = null;
              }
            });
          }
      });
    // this.socket.fromEvent("clock_refresh").subscribe(
    //   (data: any) => {
    //     this.postes.forEach(poste => {
    //       if (poste.poste._id === data.poste._id) {
    //         poste.time = data.time;
    //         poste.tarif = data.tarif;
    //       }
    //     });
    //   }
    // );

    // this.socket.fromEvent("clock_end").subscribe(
    //   (data: any) => {
    //     this.postes.forEach((poste, index) => {
    //       if (poste.poste._id === data.poste._id) {
    //         poste.time = null;
    //         poste.tarif = null;
    //       }
    //     });
    //   }
    // );
 }

  ngOnInit() {
    this.route.data.subscribe(
      (data: any) => {
        this.postes = data['postestarifs'].map(
          (poste) => {
            return {
              poste: poste.poste,
              console: poste.console,
              tarifs: poste.tarifs,
              tarif: null,
              time: null,
              isOn: false,
              timems: null
            }
          }
        );
      }
    );
  }

  getEndSignal(poste) {
    if(!poste.timems) {
      return false;
    } else if (poste.timems <= (2 * 60 * 1000)) {
      return true;
    }
  }

}
