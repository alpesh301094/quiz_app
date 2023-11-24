import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from "../../environments/environment";
import { Observable } from 'rxjs';

const baseUrl = ENV.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) { 
    this.token = localStorage.getItem(this.tokenKey);
  }

  login(credentials: any): Observable<any>{
    return this.http.post(`${baseUrl}/login`, credentials);
  }

  register(credentials: any): Observable<any>{
    return this.http.post(`${baseUrl}/register`, credentials);
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem(this.tokenKey);
  }
}
