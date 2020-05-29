import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-poste-code',
  templateUrl: './poste-code.component.html',
  styleUrls: ['./poste-code.component.scss']
})
export class PosteCodeComponent implements OnInit {
  posteactivation : any = null
  constructor(private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: any) => {
        this.posteactivation =  data['posteact'].length > 0 ? data['posteact'][0] : false;
      }
    );
  }

  onActivationSumitted(e) {
    if (e) {
      this.router.navigate(['poste']);
    } 
  }

}
