// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
  // Import environment configuration

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;  // Use the apiUrl from the environment file

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);  // Use the apiUrl for making HTTP requests
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);  // Same for registration
  }

  // Optionally use the authTokenKey to get the token from localStorage
  getAuthToken(): string | null {
    return localStorage.getItem(environment.authTokenKey);  // Retrieve token using the key from environment
  }

  // Example of storing the token
  setAuthToken(token: string): void {
    localStorage.setItem(environment.authTokenKey, token);  // Save token to localStorage
  }
}
