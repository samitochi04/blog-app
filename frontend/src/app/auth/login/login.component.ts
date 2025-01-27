import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Assuming AuthService is set up for authentication

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


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
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.authService.saveToken(res.token);
          this.router.navigate(['/']);
        },
        error: (err) => alert('Invalid credentials'),
      });
    }

  }
}
