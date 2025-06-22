import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userFirstName: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    const email = localStorage.getItem('userEmail');
    if (email) {
      this.userService.getUserByEmail(email).subscribe({
        next: (user: User) => {
          console.log('Fetched user:', user); // <-- Add this line
          this.userFirstName = user.firstName;
        },
        error: () => {
          this.userFirstName = '';
        }
      });
    }
  }
}