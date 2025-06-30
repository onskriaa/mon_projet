import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedecinService {
  private apiUrl = 'http://127.0.0.1:8000/api/medecins';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  ajouterMedecin(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, { headers: this.getHeaders() });
  }

  getAllMedecins(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }
  updateMedecin(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.apiUrl}/${data.id}`, data, { headers });
  }
  
  supprimerMedecin(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
  
}
