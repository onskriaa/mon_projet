import { Component, OnInit } from '@angular/core';
import { OrdonnanceService } from 'src/app/services/ordonnance.service';
import { PatientService } from 'src/app/services/patient.service';
import { MedicamentService } from 'src/app/services/medicament.service';
import { MedecinService } from 'src/app/services/medecin.service';

@Component({
  selector: 'app-liste-ordonnance',
  templateUrl: './liste-ordonnance.component.html',
  styleUrls: ['./liste-ordonnance.component.css']
})
export class ListeOrdonnanceComponent implements OnInit {
  ordonnances: any[] = [];
  patients: any[] = [];
  medecinNom: string = 'Nour';
  ordonnanceEnCours: any = {
    id: null,
    date: '',
    details: '',
    patient_id: null,
    medicaments: [],
  };
  modalRef: any;

  constructor(
    private ordonnanceService: OrdonnanceService,
    private patientService: PatientService,
    private medicamentService: MedicamentService,
    private medecinService: MedecinService
  ) {}

  ngOnInit(): void {
    this.chargerMedecinConnecte();
    this.loadOrdonnances();
  }

  chargerMedecinConnecte() {
    this.medecinService.getAllMedecins().subscribe((res: any) => {
      const medecins = res.medecins ?? res;
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const userId = payload.id;
          const medecin = medecins.find((m: any) => m.user_id === userId);
          this.medecinNom = medecin ? `${medecin.nom} ${medecin.prenom}` : 'Inconnu';
        } catch (e) {
          console.error('Erreur token', e);
          this.medecinNom = 'Inconnu';
        }
      }
    });
  }

  loadOrdonnances() {
    this.patientService.getAllPatients().subscribe((patientsRes: any) => {
      this.patients = patientsRes.patients ?? patientsRes;
      this.ordonnanceService.getOrdonnancesByMedecin().subscribe((res: any) => {
        const ords = res.ordonnances ?? res;
        this.ordonnances = ords.map((ord: any, i: number) => {
          const patient = this.patients.find(p => p.id === ord.patient_id);
          return {
            ...ord,
            id: ord.id ?? (i + 1),
            patient_nom: patient ? `${patient.nom} ${patient.prenom}` : 'Inconnu'
          };
        });
      });
    });
  }

  openEditModal(ordonnance: any) {
    this.ordonnanceEnCours = {
      ...ordonnance,
      medicaments: ordonnance.medicaments.map((m: any) => ({
        id: m.id,
        name: m.name,
        quantite: m.quantite
      }))
    };
    this.modalRef = new (window as any).bootstrap.Modal(
      document.getElementById('editModal')
    );
    this.modalRef.show();
  }

  validerModification() {
    const data = {
      date: this.ordonnanceEnCours.date,
      details: this.ordonnanceEnCours.details,
      patient_id: this.ordonnanceEnCours.patient_id
    };
    this.ordonnanceService.updateOrdonnance(this.ordonnanceEnCours.id, data).subscribe(
      () => {
        alert('✔️ Ordonnance mise à jour');
        this.modalRef.hide();
        this.loadOrdonnances();
      },
      err => {
        console.error(err);
        alert('❌ Échec de la mise à jour');
      }
    );
  }

  supprimerOrdonnance(id: number) {
    if (!id) {
      alert('❌ ID manquant, impossible de supprimer !');
      return;
    }
    if (confirm('❌ Supprimer cette ordonnance ?')) {
      this.ordonnanceService.deleteOrdonnance(id).subscribe(() => {
        alert('🗑️ Supprimée avec succès !');
        this.loadOrdonnances();
      }, err => {
        console.error(err);
        alert('❌ Erreur de suppression !');
      });
    }
  }

  imprimerOrdonnance(ordonnance: any): void {
    const contenu = `
      <div style="padding:20px; font-family:Arial;">
        <h2>🧾 Ordonnance Médicale</h2>
        <p><strong>👨‍⚕️ Médecin :</strong> ${this.medecinNom}</p>
        <p><strong>🧑‍🤝‍🧑 Patient :</strong> ${ordonnance.patient_nom}</p>
        <p><strong>📅 Date :</strong> ${ordonnance.date}</p>
        <p><strong>📝 Détails :</strong> ${ordonnance.details}</p>
        <h4>💊 Médicaments :</h4>
        <ul>
          ${ordonnance.medicaments.map((m: any) => `
            <li>${m.name} — Quantité : ${m.quantite}</li>
          `).join('')}
        </ul>
      </div>
    `;
    const fenetre = window.open('', '_blank', 'width=800,height=600');
    if (fenetre) {
      fenetre.document.write(`<html><head><title>Impression Ordonnance</title></head><body>${contenu}</body></html>`);
      fenetre.document.close();
      fenetre.focus();
      fenetre.print();
      fenetre.close();
    }
  }
}
