import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/api/auth';
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient) {
        const storedUser = localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
            .pipe(map(response => {
                console.log('Réponse login:', response);
                if (response && response.token) {
                    localStorage.setItem('currentUser', JSON.stringify(response));
                    this.currentUserSubject.next(response);
                }
                return response;
            }));
    }

    register(username: string, password: string, role: string = 'user') {
        return this.http.post(`${this.apiUrl}/register`, { username, password, role });
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    isAdmin(): boolean {
        const user = this.currentUserValue;
        return user && user.user.role === 'admin';
    }

    registerAdmin(username: string, password: string, adminKey: string) {
        return this.http.post(`${this.apiUrl}/register-admin`, { username, password, adminKey });
    }
} 