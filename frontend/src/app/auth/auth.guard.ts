import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {

    if (this.authService.isAuthenticated()) {
      return true; // Allow access
    } else {
      this.router.navigate(['/auth/login']); // Redirect to login if not authenticated
      return false; // Deny access
    }

    const isAuthenticated = !!this.authService.getToken();
    if (!isAuthenticated) {
      this.router.navigate(['/auth/login']);
    }
    return isAuthenticated;

  }
}
