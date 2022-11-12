import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { VenteDialogComponent } from './vente-dialog/vente-dialog.component';
import { VenteService } from './vente.service';
import { Socket } from 'ngx-socket-io';
import { StandByService } from '../stand-by/stand-by.service';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { VentesNotFinishedComponent } from '../shared/components/ventes-not-finished/ventes-not-finished.component';

import { SnackMessageService } from '../shared/snack-messages/snack-message.service';
import { SnackMessage } from '../shared/snack-messages/snack-message.model';
import { BoardService } from '../board/board.service';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.scss']
})
export class VenteComponent implements OnInit {
  postes: any = [];
  boards: any = [];
  dialogRef: MatDialogRef<VenteDialogComponent> | null;
  dialogRef2: MatDialogRef<ConfirmPasswordComponent> | null;
  config = {
    disableClose: false,
    panelClass: 'custom-overlay-pane-class',
    hasBackdrop: true,
    backdropClass: '',
    width: '50%',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    },
    data: {
      poste: null,
      state: null
    }
  };
  currentUser: any;
  minutes_to_remove = [null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  agent_minutes_to_remove = [null, 1, 3, 5];
  vente_en_cours: any = null;
  minToRemove  = null;
  form: FormGroup;
  temp: any = [];

  ventesDialogRef: MatDialogRef<VentesNotFinishedComponent> | null;
  ventesDialogConfig = {
    disableClose: true,
    panelClass: 'custom-overlay-pane-class',
    hasBackdrop: true,
    backdropClass: '',
    width: '90%',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    },
    data: {
      ventesNotFinished: null
    }
  };

  loading: boolean = false;

  constructor(private route: ActivatedRoute,
    private venteService: VenteService,
    private socket: Socket,
    private standByService: StandByService,
    private fb: FormBuilder,
    private snackMessageService: SnackMessageService,
    private boardService: BoardService,
    private dialog: MatDialog) {
    this.currentUser = JSON.parse(window.localStorage.getItem('gcmUser'));

    this.form = this.fb.group ({
      min: [null , Validators.compose ([])],
    });
    
    this.socket.fromEvent("broadcast").subscribe(
      (data: any) => {
        if (data.message === 'clock_refresh') {
          this.postes.forEach(poste => {
            if (poste.poste._id === data.poste._id) {
              poste.time = data.time;
              poste.tarif = data.tarif;
              poste.timems = data.timems;
              poste.vente = data
            }
          });
        } else if (data.message === 'clock_end') {
          this.postes.forEach((poste, index) => {
            if (poste.poste._id === data.poste._id) {
              poste.time = null;
              poste.tarif = null;
              poste.timems = null;
              poste.vente = null;
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

    this.socket.fromEvent("simple_on_success").subscribe(
      (data: any) => {
        this.postes.forEach((poste, index) => {
          if (poste.poste._id === data._id) {
            poste.isOn = true;
          }
        });
      }
    );

    this.socket.fromEvent("simple_off_success").subscribe(
      (data: any) => {
        this.postes.forEach((poste, index) => {
          if (poste.poste._id === data._id) {
            poste.isOn = false;
          }
        });
      }
    );

    // let ventesNotFinished = window.localStorage.getItem('ventesNotFinished');
    // if (ventesNotFinished) {
    //   let ventesNotFinishedParsed = JSON.parse(ventesNotFinished);
    //   console.log(ventesNotFinishedParsed);
    //   if (ventesNotFinishedParsed.length > 0) {
    //     this.ventesDialogConfig.data.ventesNotFinished = ventesNotFinishedParsed;
    //     this.ventesDialogRef = this.dialog.open(VentesNotFinishedComponent, this.ventesDialogConfig);
    //     this.ventesDialogRef.afterClosed().subscribe((result: any) => {
    //       console.log(result);
    //     });
    //   }
    // }

    this.venteService.venteNotFinishedSubject.asObservable().subscribe(
      (res) => {
        if (res) {
          console.log(res);
          res.tarif.hour = Number(res.remaining_time.hour);
          res.tarif.minute = Number(res.remaining_time.minute);
          res.tarif.second = Number(res.remaining_time.second);
          this.socket.emit("start_chrono", res);
        }
      }
    )

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
              timems: null, 
              vente: null
            }
          }
        );
        this.temp = this.postes;
        this.boards = data['boards'];
      }
    );
  }

  openVenteDialog(poste, state) {
    
    let cur_p = {
      poste: poste.poste,
      tarif: null,
      console: poste.console,
      tarifs: poste.tarifs
    };
    // console.log(cur_p);
    this.config.data.poste = cur_p;
    this.config.data.state = state;
    this.dialogRef = this.dialog.open( VenteDialogComponent, this.config);
    this.dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log(data);
        if (this.config.data.state === 'add') {
          this.startTime(data);
        } else if (this.config.data.state === 'create') {
          let index = this.postes.findIndex(
            (p) => p.poste._id === data.poste._id
          );
          this.postes[index] = data;
        }
      }
    });
  
  }

  openConfirmPasswordDialog(poste) {
    this.dialogRef2 = this.dialog.open(ConfirmPasswordComponent, this.config);
    this.dialogRef2.afterClosed().subscribe((data) => {
      if (data) {
        this.socket.emit("simple_on", poste.poste); 
      }
    });
  }

  startTime(poste) {
    this.loading = true;
    this.boardService.getBoard(poste.poste.board_id).subscribe(
      (res: any) => {

        this.boardService.testBoard(res).subscribe(
          (res) => {
            
            this.loading = false;
            this.venteService.createVente(poste).subscribe(
              (res) => {
                if(res.message === 'success') {
                  this.vente_en_cours = res.vente;
                  this.socket.emit("start_chrono", res.vente);
                }
              }, (err) => {
                console.log(err);
              }
            );

          }, (err) => {
            this.loading = false;
            this.snackMessageService.newMessage.next(
              new SnackMessage('danger', 'Carte non disponible.'));
          }
        )

      }, (err) => {
        this.loading = false;
        this.snackMessageService.newMessage.next(
          new SnackMessage('danger', 'Erreur inattendue.'));
      }
    );
    
  }

  abortTime(poste) {
    poste.time = null;
    poste.tarif = null;
  }

  stopTime(poste) {
    this.socket.emit("stop_chrono", poste.poste);
  }

  simplePosteOn(poste) {
    this.openConfirmPasswordDialog(poste);
  }

  simplePosteOff(poste) {
    this.socket.emit("simple_off", poste.poste); 
  }

  onRemoveMinute(poste, min) {
    if (confirm('Confirmez')) {
      if (poste.vente.timems > (this.form.value.min * 60 * 1000)) {
        if (poste.vente && this.form.value.min && this.form.value.min !== 0) {
          poste.vente.tarif.hour = 0;
          poste.vente.tarif.minute = -this.form.value.min;
          poste.vente.tarif.second = 0;
          this.form.reset();
          this.socket.emit("start_chrono", poste.vente);
        }
      } else {
        alert("Le temps à retrancher est supérieur au temps restant.");
        this.form.reset();
      }
    }
  }
  getPostesToTransfert(poste) {
    return this.postes.filter(
      (p) => {
        return (p.poste.name !== poste.poste.name && p.console.name === poste.console.name);
      }
    );
  }

  tranfertTime(poste, posteToTranfertTo) {
    if (posteToTranfertTo.time !== null) {
      let msg = 'Le ' + posteToTranfertTo.poste.name + ' est présentement allumé, voulez vous cotinuer ?';
      if (confirm(msg)) {
          let h = Math.trunc(Number(poste.timems) / (1000 * 60 * 60));
          let m = Math.trunc((Number(poste.timems) - (h * 1000 * 60 * 60)) / (1000 * 60));
          let s = Math.trunc((Number(poste.timems) - ((h * 1000 * 60 * 60) + (m * 1000 * 60))) / 1000);
          poste.vente.tarif.hour = h;
          poste.vente.tarif.minute = m > 1 ? (m - 1) : m;
          poste.vente.tarif.second = s;
          poste.vente.poste = posteToTranfertTo.poste;
          this.form.reset();
          this.socket.emit("start_chrono", poste.vente);
          setTimeout(
            () => {
              this.socket.emit("stop_chrono", poste.poste);
            }, 1000
          );
      } else {
        this.form.reset();
      }
    } else {
      if (confirm('Etes vous sûre du transfert ?')) {
        let h = Math.trunc(Number(poste.timems) / (1000 * 60 * 60));
        let m = Math.trunc((Number(poste.timems) - (h * 1000 * 60 * 60)) / (1000 * 60));
        let s = Math.trunc((Number(poste.timems) - ((h * 1000 * 60 * 60) + (m * 1000 * 60))) / 1000);
        poste.vente.tarif.hour = h;
        poste.vente.tarif.minute = m > 1 ? (m - 1) : m;
        poste.vente.tarif.second = s;
        let board = this.boards.filter((brd) => {
          return  brd._id == posteToTranfertTo.poste.board_id;
        });
        console.log('Board filtered');
        console.log(board[0]);
        poste.vente.poste = {
          ...posteToTranfertTo.poste,
          board: board[0]
        };
        this.form.reset();
        this.socket.emit("start_chrono", poste.vente);
        setTimeout(
          () => {
            this.socket.emit("stop_chrono", poste.poste);
          }, 1000
        );
      } else {
        this.form.reset();
      }
    }
  }

  getPosteNumber = (poste) => {
    return Number((poste.name.split(" "))[1]);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    console.log(val);
    if(val === null || val === '') {
      this.postes = this.temp;
    } else {
      // filter our data
      const temp = this.temp.filter((d) => {
        return Number(val) === this.getPosteNumber(d.poste);
      });
      // update the rows
      this.postes = temp;
    }
  }

  getEndSignal(poste) {
    if(!poste.timems) {
      return false;
    } else if (poste.timems <= (2 * 60 * 1000)) {
      return true;
    }
  }

  getVenteNotFinished() {
    console.log('Vente not finished');
    this.venteService.getVenteNotFinished().subscribe(
      (ventes) => {
        console.log(ventes);

        try {
          if (ventes.ventes.length > 0) { 
            this.ventesDialogConfig.data.ventesNotFinished = ventes.ventes;
            this.ventesDialogRef = this.dialog.open(VentesNotFinishedComponent, this.ventesDialogConfig);
            this.ventesDialogRef.afterClosed().subscribe((result: any) => {
              console.log(result);
            });
          } else {
            this.snackMessageService.newMessage.next(
              new SnackMessage('danger',
               'Pas de ventes non terminées trouvées.'));
          }
        } catch (err) {
          this.snackMessageService.newMessage.next(
            new SnackMessage('danger',
             'Une erreur s\'est produite réesseyez s\'il vous plaît.'));
        }
        
      }, (err) => {
        console.log(err);

        this.snackMessageService.newMessage.next(
          new SnackMessage('danger',
           'Une erreur s\'est produite réesseyez s\'il vous plaît.'));
      }
    );
  }

  testBoard(poste) {
    console.log(poste);
    this.loading = true;
    this.boardService.getBoard(poste.poste.board_id).subscribe(
      (res: any) => {

        this.boardService.testBoard(res).subscribe(
          (res) => {
            this.loading = false;
            this.snackMessageService.newMessage.next(
              new SnackMessage('success', 'La carte est bien disponible, vous pouvez continuer'));
          }, (err) => {
            this.loading = false;
            this.snackMessageService.newMessage.next(
              new SnackMessage('danger', 'Carte non disponible.'));
          }
        )

      }, (err) => {
        this.loading = false;
        this.snackMessageService.newMessage.next(
          new SnackMessage('danger', 'Erreur inattendue.'));
      }
    );
    
  }
  
}
