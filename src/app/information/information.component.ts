import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  user: any;
  form: FormGroup;
  onModificate = false;
  constructor(private route: ActivatedRoute, private fb: FormBuilder ) { 
    this.form = this.fb.group ({
      lastname: [null , Validators.compose ( [ Validators.required ] )],
      firstname: [null , Validators.compose ( [ Validators.required ] )],
      username: [null , Validators.compose ( [ Validators.required ] ),
       Validators.composeAsync([]) ],
      role: [null , Validators.compose ( [ Validators.required ] )],
      _id: [null , Validators.compose ( [ Validators.required ] )]
    });
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data: any) => {
        this.user = data['user'];
        this.form.patchValue(this.user);
        this.form.disable();
      }
    );
  }
  
  activateModification() {
    this.onModificate = !this.onModificate;
    if(this.onModificate) {
      this.form.enable();
      this.form.controls['username'].disable();
      this.form.controls['role'].disable();
      
    } else {
      this.form.disable();
    }
  }

  submit() {
    
  }

}
