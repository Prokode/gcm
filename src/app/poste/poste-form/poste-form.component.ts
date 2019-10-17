import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-poste-form',
  templateUrl: './poste-form.component.html',
  styleUrls: ['./poste-form.component.scss']
})
export class PosteFormComponent implements OnInit {
  form: FormGroup;
  @Input('formstate') formstate: any;
  @Input('consoles') consoles: any;
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group ({
      name: [null , Validators.compose ([Validators.required, Validators.minLength(2)])],
      console_id: [null , Validators.compose ([Validators.required, Validators.minLength(2)])],
      id: [null , Validators.compose ([])]
    });
   }

  ngOnInit() {
  }

}
