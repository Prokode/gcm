import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-console-show',
  templateUrl: './console-show.component.html',
  styleUrls: ['./console-show.component.scss']
})
export class ConsoleShowComponent implements OnInit {
  console: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: any) => {
        this.console = data['console'];
      }
    );
  }

}
