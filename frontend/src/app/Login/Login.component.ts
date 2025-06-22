import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage = '';
  loginSuccessful = false;
  loginFailed = false;

  constructor(private userService: UserService, private router: Router) {}

  login() {
    this.userService.login(this.credentials).subscribe({
      next: (response) => {
        localStorage.setItem('userEmail', this.credentials.email);
        this.loginSuccessful = true;
        this.loginFailed = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = 'Invalid email or password';
        this.loginSuccessful = false;
        this.loginFailed = true;
      }
    });
  }
}
