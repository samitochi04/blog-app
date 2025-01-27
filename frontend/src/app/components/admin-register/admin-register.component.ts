import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class AdminRegisterComponent {
  username: string = '';
  password: string = '';
  adminKey: string = '';
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit() {
    this.authService.registerAdmin(this.username, this.password, this.adminKey)
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Erreur détaillée:', err);
          this.error = err.error?.message || 'Erreur lors de l\'inscription admin';
        }
      });
  }
} 