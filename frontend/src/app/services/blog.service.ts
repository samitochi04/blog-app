import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:3000/api/blogs';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.currentUserValue?.token;
    console.log('Token utilisé:', token);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllBlogs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getBlogById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createBlog(blog: any): Observable<any> {
    const headers = this.getHeaders();
    console.log('Headers envoyés:', headers);
    return this.http.post(this.apiUrl, blog, { headers });
  }

  updateBlog(id: string, blog: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, blog, { headers: this.getHeaders() });
  }

  deleteBlog(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
