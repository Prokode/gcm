import { Component, OnInit } from '@angular/core';
import { UserLoggedService } from './user-logged.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: any = [];
  loading = false;
  constructor(private userLoggedService: UserLoggedService ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.userLoggedService.getUsers().subscribe(
      (res) => {
        if (res.message === 'success') {
          this.users = res.users;
          this.loading = false;
        }
        
      }
    );
  }

}
