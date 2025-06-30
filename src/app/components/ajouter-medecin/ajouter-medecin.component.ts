import { Component, OnInit } from '@angular/core';
import { MedecinService } from '../../services/medecin.service';

@Component({
  selector: 'app-ajouter-medecin',
  templateUrl: './ajouter-medecin.component.html',
  styleUrls: ['./ajouter-medecin.component.css']
})

export class AjouterMedecinComponent implements OnInit {
  medecin = {
    id: null,
    nom: '',
    prenom: '',
    specialite: '',
    email: '',
    password: ''
  };

  medecins: any[] = [];

  constructor(private medecinService: MedecinService) {}

  ngOnInit(): void {
    this.getMedecins();
  }

  onSubmit() {
    if (this.medecin.id) {
      this.medecinService.updateMedecin(this.medecin).subscribe(
        () => {
          alert('Médecin mis à jour');
          this.resetForm();
          this.getMedecins();
        },
        err => {
          alert('Erreur de mise à jour');
          console.error(err);
        }
      );
    } else {
      this.medecinService.ajouterMedecin(this.medecin).subscribe(
        () => {
          alert('Médecin ajouté');
          this.resetForm();
          this.getMedecins();
        },
        err => {
          alert('Erreur d’ajout');
          console.error(err);
        }
      );
    }
  }

  editMedecin(med: any): void {
    this.medecin = {
      id: med.id,
      nom: med.nom,
      prenom: med.prenom,
      specialite: med.specialite,
      email: med.user?.email || '',
      password: ''
    };
  }

  deleteMedecin(id: number): void {
    if (confirm('Confirmer la suppression ?')) {
      this.medecinService.supprimerMedecin(id).subscribe(
        () => {
          alert('Médecin supprimé');
          this.getMedecins();
        },
        err => {
          alert('Erreur suppression');
          console.error(err);
        }
      );
    }
  }

  getMedecins() {
    this.medecinService.getAllMedecins().subscribe(
      (res: any) => {
        this.medecins = res.medecins || res;
      },
      err => {
        console.error('Erreur chargement médecins', err);
      }
    );
  }

  resetForm() {
    this.medecin = {
      id: null,
      nom: '',
      prenom: '',
      specialite: '',
      email: '',
      password: ''
    };
  }
}
