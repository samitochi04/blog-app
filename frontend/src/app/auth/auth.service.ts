import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  // User login
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // User registration
  register(userData: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Store token in localStorage
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Retrieve token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Clear token
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
