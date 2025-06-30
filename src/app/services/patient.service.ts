// patient.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PatientService {

  // Assure-toi que l'URL correspond à celle de ton API
  private apiUrl = 'http://127.0.0.1:8000/api/patients';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  // Récupérer tous les patients
  getAllPatients(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }

  // Supprimer un patient par son ID
 
  deletePatient(id: number): Observable<any> {
    const token = localStorage.getItem('token'); // vérifie que ce token existe
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.delete(`http://localhost:8000/api/admin/patients/${id}`, { headers });
  }
}
