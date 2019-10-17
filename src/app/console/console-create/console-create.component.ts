import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-console-create',
  templateUrl: './console-create.component.html',
  styleUrls: ['./console-create.component.scss']
})
export class ConsoleCreateComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  onConsoleFormSubmit(id) {
    if (id) {
      
    }
  }
}
