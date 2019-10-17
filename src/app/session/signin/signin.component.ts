import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../shared/auth/auth.service';
import { UserService } from '../../shared/user/user.service';
import { User } from '../../shared/user/model/user.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public form: FormGroup;
  constructor(private fb: FormBuilder,
     private authService: AuthService,
     private userService: UserService,
     private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group ({
      username: [null , Validators.compose ( [ Validators.required ] )],
      password: [null , Validators.compose ( [ Validators.required ] )]
    });
  }

  onSubmit() {
    this.authService.signingUser(this.form.value).subscribe(
      (res) => {
        const user = new User(this.form.value.username, null, res.token);
        const gcmUser = window.localStorage.getItem('gcmUser');
        if (gcmUser) {
          window.localStorage.removeItem('gcmUser');
        }
        window.localStorage.setItem('gcmUser', JSON.stringify(user));
        this.userService.currentUser.next(user);
        this.router.navigate( ['/'] );
      }, (err) => {
        console.log(err);
      }
    );
  }

}
