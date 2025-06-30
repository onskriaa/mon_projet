import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-ajouter-medicaments',
  templateUrl: './ajouter-medicaments.component.html',
  styleUrls: ['./ajouter-medicaments.component.css']
})
export class AjouterMedicamentsComponent {

  medicament = {
    name: '',
    description: '',
    prix: 0,
    photo: ''
  };

  constructor(private http: HttpClient) {}

  ajouterMedicament() {
    const token = localStorage.getItem('token'); // ← assure-toi que tu as bien stocké le token après login

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post('http://127.0.0.1:8000/api/medicaments', this.medicament, { headers }).subscribe({
      next: (response) => {
        alert('✅ Médicament ajouté avec succès !');
        this.medicament = {
          name: '',
          description: '',
          prix: 0,
          photo: ''
        };
      },
      error: (error) => {
        console.error('Erreur lors de l’ajout du médicament', error);
        alert('❌ Erreur : ' + error.error.message || 'Impossible d’ajouter le médicament');
      }
    });
  }
}
