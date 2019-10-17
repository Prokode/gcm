import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-re-activation',
  templateUrl: './re-activation.component.html',
  styleUrls: ['./re-activation.component.scss']
})
export class ReActivationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onActivationSuccess(e) {
    if (e) {
      this.router.navigate(['/', 'session', 'signin']);
    }
  }

}
