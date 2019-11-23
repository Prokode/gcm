import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  form: FormGroup;
  onModificate = false;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group ( {
      oldPassword: [null , Validators.compose ( [ Validators.required] )],
      password: [null , Validators.compose ( [ Validators.required, Validators.minLength(8) ] )],
      passwordConfirm:  [null , Validators.compose ( [Validators.required,
         this.samePasswordValidator ] )]
    });
   }

  ngOnInit() {
    this.form.disable();
  }

  samePasswordValidator(control: FormControl) {
    if (control) {
      const parent = control.parent;
      if (parent) {
          if (parent.controls['password'].value === control.value) {
              return;
          } else {
              return { samePassword: true };
          }
        }    
    }
  }
  
  activateModification() {
    this.onModificate = !this.onModificate;
    if(this.onModificate) {
      this.form.enable();
    } else {
      this.form.disable();
    }
  }

  submit() {
    
  }

}
