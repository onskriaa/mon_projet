import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicamentService {

  private apiUrl = 'http://127.0.0.1:8000/api/medicaments';

  constructor(private http: HttpClient) {}

  // 🔐 Gestion sécurisée du JWT Token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn("⚠️ Aucun token trouvé !");
    }
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  // ➕ Ajouter un médicament
  ajouterMedicament(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, { headers: this.getHeaders() });
  }

  // 📋 Obtenir tous les médicaments
  getAllMedicaments(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }

  // 🗑 Supprimer un médicament
  supprimerMedicament(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // ✏️ Modifier un médicament
  updateMedicament(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders() });
  }

  // 🔍 Obtenir un médicament par ID (optionnel pour détails)
  getMedicamentById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
