import { Component, OnInit } from '@angular/core';
import { MedicamentService } from '../../services/medicament.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ajouter-medicaments',
  templateUrl: './ajouter-medicaments.component.html',
  styleUrls: ['./ajouter-medicaments.component.css']
})
export class AjouterMedicamentsComponent implements OnInit {

  medicament = {
    name: '',
    description: '',
    prix: 0,
    photo: ''
  };

  medicamentEdit = {
    id: 0,
    name: '',
    description: '',
    prix: 0,
    photo: ''
  };

  medicaments: any[] = [];

  constructor(private medicamentService: MedicamentService) {}

  ngOnInit(): void {
    this.getMedicaments();
  }

  ajouterMedicament() {
    this.medicamentService.ajouterMedicament(this.medicament).subscribe({
      next: () => {
        alert('✅ Médicament ajouté avec succès !');
        this.resetForm();
        this.getMedicaments();
      },
      error: () => alert('❌ Erreur lors de l\'ajout')
    });
  }

  getMedicaments(): void {
    this.medicamentService.getAllMedicaments().subscribe({
      next: (response: any) => this.medicaments = response.medicaments,
      error: () => alert('❌ Impossible de récupérer les médicaments')
    });
  }

  supprimerMedicament(id: number): void {
    if (confirm('❗ Voulez-vous supprimer ce médicament ?')) {
      this.medicamentService.supprimerMedicament(id).subscribe({
        next: () => {
          alert('✅ Médicament supprimé avec succès !');
          this.getMedicaments();
        },
        error: () => alert('❌ Erreur lors de la suppression')
      });
    }
  }

  chargerMedicament(med: any) {
    this.medicamentEdit = { ...med };
  }

  modifierMedicament() {
    this.medicamentService.updateMedicament(this.medicamentEdit.id, this.medicamentEdit).subscribe({
      next: () => {
        alert('✅ Médicament modifié avec succès !');
        this.getMedicaments();
      },
      error: () => alert('❌ Erreur lors de la modification')
    });
  }

  resetForm() {
    this.medicament = { name: '', description: '', prix: 0, photo: '' };
  }
}
