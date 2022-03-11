import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaveConfigService } from './save-config.service';

@Component({
  selector: 'app-save-config',
  templateUrl: './save-config.component.html',
  styleUrls: ['./save-config.component.scss']
})
export class SaveConfigComponent implements OnInit {
  form: FormGroup;
  error: any = null;
  successMsg: any = null;
  progress = 0;

  constructor(private saveConfigService: SaveConfigService, private fb: FormBuilder) {
    this.form = this.fb.group ({
      password: [null , Validators.compose ([Validators.required]),
        Validators.composeAsync([])]
    });
  }

  ngOnInit() {
  }

  saveConfig() {
    this.error = null;
    this.form.disable();
    
    this.saveConfigService.loadConfigs({
      password: this.form.value.password
    }).subscribe(
      (configs) => {
        this.progress = 5;
        this.animatingProgress(5, 75);
        this.saveConfigService.saveConfigs({
          'configs': configs
        }).subscribe(
          (res) => {
            this.animatingProgress(75, 100);
            console.log(res);
            this.form.enable();
            this.form.reset();
            this.successMsg = "Vos configurations ont été bien enrégistrées avec succès.";
            setTimeout(() => { this.successMsg = null; }, 10000);
          },
          (err) => {
            this.form.enable();
          }
        )
      }, (err: any) => {
        console.log(err);
        if (err.code === 400) {
          this.error = 'Mot de passe incorrect';
        }
        this.form.enable();
      }
    );
  }

  chargeConfig() {

  }

  animatingProgress(from, to) {
    this.progress = from;
    let i = from;
    while(i < to) {
      i = i + 1;
      this.progress = i;
      setTimeout(() => {}, 5000);
    }
    if (this.progress === 100) {
      this.progress = 0;
    }
  }

}
