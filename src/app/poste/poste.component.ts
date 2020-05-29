import { Component, OnInit } from '@angular/core';
import { PosteService } from './poste.service';
import { SnackMessageService } from '../shared/snack-messages/snack-message.service';
import { SnackMessage } from '../shared/snack-messages/snack-message.model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivationService } from '../shared/activation/activation.service';

@Component({
  selector: 'app-poste',
  templateUrl: './poste.component.html',
  styleUrls: ['./poste.component.scss']
})
export class PosteComponent implements OnInit {
  postes: any = [];
  temp: any = [];
  loading = false;
  posteactivation = false;
  form: FormGroup;
  constructor(private posteService: PosteService, private fb: FormBuilder,
    private activationService: ActivationService, private router: Router,
    private snackMessageService: SnackMessageService, private route: ActivatedRoute) {
      this.form = this.fb.group ({
        code: [null , Validators.compose ([Validators.required]),
          Validators.composeAsync([])]
      });
      this.router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
      };
      this.router.events.subscribe((evt) => {
        if (evt instanceof NavigationEnd) {
          this.router.navigated = false;
        }
      });
  }

  ngOnInit() {
    this.getPostes();
    this.route.data.subscribe(
      (data: any) => {
        this.posteactivation =  data['posteact'].length > 0 ? true : false;
      }
    );
  }

  getPostes() {
    this.loading = true;
    this.posteService.getPostes().subscribe(
      (res) => {
        this.postes = res;
        this.temp = res;
        this.loading = false;
      }, (err) => {
        this.snackMessageService.newMessage.next(
          new SnackMessage('danger', 'Une erreur s\'est produite lors de l\'opération, réesseyez.'));
      }
    )
  }

  checkForPosteActivation() {
    this.posteService.getPosteActivationDetails().subscribe(
      (res: any) => {
        this.posteactivation =  res.length > 0 ? true : false;
      }
    );
  }

  checkPosteLimitation() {
    this.posteService.checkPosteLimitation().subscribe(
      (res) => {
        if (res.message === 'success') {
          if (res.limit) {
            this.snackMessageService.newMessage.next(
              new SnackMessage('danger', 'Le nombre limite de poste à créér est atteint.'));
          } else {
            this.router.navigate(['/poste/create'])
          }
        }
      }, (err) => {
        this.snackMessageService.newMessage.next(
          new SnackMessage('danger', 'Une erreur s\'est produite lors de l\'opération, réesseyez.'));
      }
    )
  }

  onActivationSumitted(e) {
    if (e) {
      this.checkForPosteActivation();
    } 
  }


  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function(d) {
      console.log(Number(d.poste.name));
      return d.poste
    });
    // update the rows
    // this.postes = temp;
  }

  onPosteDisable(row) {
    if (confirm("Confrimez")) {
      this.posteService.disablePoste(row.poste).subscribe(
        (res) => {
          this.snackMessageService.newMessage.next(
            new SnackMessage('success', 'Le poste est désactivé avec succès'));
          this.getPostes();  
        }, (err) => {
          this.snackMessageService.newMessage.next(
            new SnackMessage('danger', 'Une erreur s\'est produite lors de l\'opération, réesseyez.'));
        }
      );
    }
  }

  getRowClass(row) {
    return {
      'poste-disabled': row.poste.wasDisable
    };
  }

}
