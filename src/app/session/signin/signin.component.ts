import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../shared/auth/auth.service';
import { UserService } from '../../shared/user/user.service';
import { User } from '../../shared/user/model/user.model';
import {
  VenteService
} from '../../vente/vente.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public form: FormGroup;
  showErrorMsg = false;
  society: any;
  loading = false;
  errorMsg: string = null;
  constructor(private fb: FormBuilder,
     private authService: AuthService,
     private userService: UserService,
     private route: ActivatedRoute,
     private venteService: VenteService,
     private router: Router) {}

  ngOnInit() {
    this.route.data.subscribe(
      (data: any) => {
        this.society = data['society'].society !== null && data['society'].society !== undefined ? data['society'].society : 'Society_name_must_be_defined';
      }
    );

    this.form = this.fb.group ({
      username: [null , Validators.compose ( [ Validators.required ] )],
      password: [null , Validators.compose ( [ Validators.required ] )]
    });
  }

  onSubmit() {
    this.showErrorMsg = false;
    this.errorMsg = '';
    this.loading = true;
    this.authService.signingUser(this.form.value).subscribe(
      (res) => {
        console.log(res);
        const user = new User(this.form.value.username, null, res.token, res.role);
        const gcmUser = window.localStorage.getItem('gcmUser');
        if (gcmUser) {
          window.localStorage.removeItem('gcmUser');
        }
        window.localStorage.setItem('gcmUser', JSON.stringify(user));
        this.userService.currentUser.next(user);
        this.venteService.getVenteNotFinished().subscribe(
          (ventes) => {
            console.log(res);
            const ventesNotFinished = window.localStorage.getItem('ventesNotFinished');
            if (ventesNotFinished) {
              window.localStorage.removeItem('ventesNotFinished');
            }
            window.localStorage.setItem('ventesNotFinished', JSON.stringify(ventes.ventes));
            this.router.navigate( ['/'] );
          }, (err) => {
            console.log(err);
            this.errorMsg = "Une erreur s'est produite, réesseyez s'il vous plaît.";
            this.showErrorMsg = true;
            this.loading = false;
          }
        );
        //
      }, (err) => {
        console.log(err.message);
        this.errorMsg = "Les paramètres de connexion sont incorrectes";
        this.showErrorMsg = true;
        this.loading = false;
      }
    );
  }

}
