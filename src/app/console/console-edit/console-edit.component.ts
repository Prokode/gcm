import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-console-edit',
  templateUrl: './console-edit.component.html',
  styleUrls: ['./console-edit.component.scss']
})
export class ConsoleEditComponent implements OnInit {
  console: any;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: any) => {
        this.console = data['console'];
      }
    );
  }

  onConsoleFormSubmit(id) {
    if (id) {
    }
  }

}
