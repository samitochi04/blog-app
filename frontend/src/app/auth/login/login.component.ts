import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Assuming AuthService is set up for authentication

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // Make sure you implement the authentication logic here
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Logged in successfully!', response);
        this.router.navigate(['/dashboard']); // Redirect to a protected page after successful login
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
}
