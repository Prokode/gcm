import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackMessageService } from '../shared/snack-messages/snack-message.service';
import { SnackMessage } from '../shared/snack-messages/snack-message.model';
import { RaportService } from './raport.service';

@Component({
  selector: 'app-raport',
  templateUrl: './raport.component.html',
  styleUrls: ['./raport.component.scss']
})
export class RaportComponent implements OnInit {
  consoles: any = [];
  postes: any = [];
  users: any = [];
  form: FormGroup;
  filter_by_values = [
    null,
    'Console',
    'Utilisateur',
    'Poste'
  ];
  showFilters: Boolean = true;
  loading: Boolean = false;
  constructor(private route: ActivatedRoute,
    private raportService: RaportService,
    private router: Router,
    private snackMessageService: SnackMessageService,
     private fb: FormBuilder) {
    this.form = this.fb.group ({
      date_debut: [null , Validators.compose ([Validators.required])],
      date_fin: [null , Validators.compose ([Validators.required, this.validateDateRange ])],
      filtre_console: [null , Validators.compose ([])],
      filtre_poste: [null , Validators.compose ([])],
      filtre_user: [null , Validators.compose ([])],
      filtre_par: [null , Validators.compose ([])],
    });
   }

  ngOnInit() {
    const currentUser: any = JSON.parse(window.localStorage.getItem('gcmUser'));
    this.route.data.subscribe(
      (data: any) => {
        this.consoles = data['consoles'];
        this.postes = data['postes'];
        this.users = data['users'].users;
      }
    );
    if (currentUser.role !== 'ADMIN') {
        this.showFilters = false;
        this.form.controls['date_debut'].setValue(new Date());
        this.form.controls['date_fin'].setValue(new Date());
        this.form.controls['date_debut'].disable();
        this.form.controls['date_fin'].disable();
    }
  }

  validateDateRange(control: FormControl) {
    if (control.parent) {
      if (control.parent.getRawValue().date_debut) {
        if (control.parent.getRawValue().date_debut.getTime() > control.value.getTime()) {
          return {
            dateError: true
          }
        } else {
          return null;
        }
      }
    }
  }

  submit() {
    if (this.form.getRawValue().date_debut.getTime() > this.form.getRawValue().date_fin.getTime()) {
      this.snackMessageService.newMessage.next(
        new SnackMessage('danger', 'La date de début ne peut être supérieur à la date de fin.'));
    } else {
      this.raportService.getRaport(this.form.getRawValue()).subscribe(
        (res) => {
          if (res.message === "success") {
            window.localStorage.setItem('report', JSON.stringify(res));
            this.router.navigate(['/raport/result']);
          }
        }
      )
    }
  }

}
