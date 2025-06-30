// liste-patients.component.ts
import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {

  patients: any[] = [];

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(): void {
    this.patientService.getAllPatients().subscribe({
      next: (res: any) => {
        this.patients = res.patients; // Assure-toi que ta réponse renvoie { patients: [...] }
        console.log('Patients récupérés :', this.patients);
      },
      error: (err) => {
        console.error('Erreur API :', err);
        alert('Erreur lors de la récupération des patients');
      }
    });
  }

  // Méthode pour supprimer un patient
  supprimerPatient(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce patient ?')) {
      this.patientService.deletePatient(id).subscribe({
        next: () => {
          alert('Patient supprimé avec succès !');
          this.getPatients(); // Rafraîchit la liste après suppression
        },
        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
          alert('Erreur lors de la suppression du patient');
        }
      });
    }
  }
}
