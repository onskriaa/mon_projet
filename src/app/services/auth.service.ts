import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  //  Connexion
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        // 💾 Stocker le token et l'utilisateur
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
      })
    );
  }

  //  Inscription
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  //  Est-ce que l'utilisateur est connecté ?
  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  //  Obtenir l'utilisateur connecté
  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  //  Obtenir le token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  //  Déconnexion
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
