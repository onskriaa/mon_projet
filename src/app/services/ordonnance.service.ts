import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrdonnanceService {
  private apiUrl = 'http://127.0.0.1:8000/api/ordonnances';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });
  }

  getOrdonnancesByMedecin(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }

  updateOrdonnance(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders() });
  }

  deleteOrdonnance(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  getOrdonnancesForPatient(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/patient/ordonnances', {
      headers: this.getHeaders()
    });
  }
  getAllOrdonnances(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/admin/ordonnances', {
      headers: this.getHeaders()
    });
  }
  
}
