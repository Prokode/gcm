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

  submitPosteActivation() {
    this.form.disable();
    this.activationService.getActivation().subscribe(
      (res) => {
        if (res.token) {
          this.posteService.postOnlinePosteActivation({
            code: this.form.getRawValue().code,
            token: res.token
          }).subscribe(
            (res) => {
              if (res.message === 'success') {
                this.posteService.postLocalPosteActivation(res).subscribe(
                  (res) => {
                    if (res.message === 'success') {
                      this.snackMessageService.newMessage.next(
                        new SnackMessage('success',
                         'L\'activation des postes a été effectuée avec succès.'));
                        this.checkForPosteActivation();
                    } else {
                      this.form.enable();
                      this.snackMessageService.newMessage.next(
                        new SnackMessage('danger',
                         'Une erreur s\'est produite lors de l\'opération, réesseyez.'));
                    }
                  }, (err) => {
                    this.form.enable();
                    this.snackMessageService.newMessage.next(
                      new SnackMessage('danger', 'Une erreur s\'est produite lors de l\'opération, réesseyez.'));
                  }
                )
              } else if (res.message === 'Code_is_used') {
                this.form.enable();
                this.snackMessageService.newMessage.next(
                  new SnackMessage('danger', 'Le code entré a été déjà utilisé'));
              }  else if (res.message === 'Code_is_incorrect') {
                this.form.enable();
                this.snackMessageService.newMessage.next(
                  new SnackMessage('danger', 'Le code entré est incorrect'));
              }  else if (res.message === 'Activation_error') {
                this.form.enable();
                this.snackMessageService.newMessage.next(
                  new SnackMessage('danger', 'Une erreur de l\'activation du produit'));
              } 
            }, (err) => {
              this.form.enable();
              this.snackMessageService.newMessage.next(
                new SnackMessage('danger', 'Une erreur s\'est produite lors de l\'opération, réesseyez.'));
            }
          )
        }
      }, (err) => {
        this.form.enable();
        this.snackMessageService.newMessage.next(
          new SnackMessage('danger', 'Une erreur s\'est produite lors de l\'opération, réesseyez.'));
      }
    );
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

}
