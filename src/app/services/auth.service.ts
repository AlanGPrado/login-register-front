import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly secretKey = 'DOLLYNINFA1999';
  private backendUrl = 'http://localhost:3000';

  constructor(private router: Router, private http: HttpClient) { }

  registerUser(fullName: string, mobileNumber: string, email: string, password: string) {
    const userData = { fullName, mobileNumber, email, password };
    return this.http.post(`${this.backendUrl}/register`, userData);
  }

  loginUser(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post(`${this.backendUrl}/login`, loginData);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }
}
