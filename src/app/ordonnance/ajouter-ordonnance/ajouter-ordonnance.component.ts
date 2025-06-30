import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { MedicamentService } from 'src/app/services/medicament.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-ajouter-ordonnance',
  templateUrl: './ajouter-ordonnance.component.html',
  styleUrls: ['./ajouter-ordonnance.component.css']
})
export class AjouterOrdonnanceComponent implements OnInit {

  patients: any[] = [];
  medicaments: any[] = [];
  selectedPatientId: number | null = null;
  ordonnanceDate: string = '';
  details: string = '';

  selectedMedicaments: number[] = [];
  medicamentQuantities: { [id: number]: number } = {};

  constructor(
    private patientService: PatientService,
    private medicamentService: MedicamentService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.patientService.getAllPatients().subscribe(res => {
      this.patients = res.patients ?? res;
    });

    this.medicamentService.getAllMedicaments().subscribe(res => {
      this.medicaments = res.medicaments ?? res;
    });
  }

  toggleMedicamentSelection(id: number): void {
    if (this.selectedMedicaments.includes(id)) {
      this.selectedMedicaments = this.selectedMedicaments.filter(m => m !== id);
      delete this.medicamentQuantities[id];
    } else {
      this.selectedMedicaments.push(id);
      this.medicamentQuantities[id] = 1;
    }
  }

  submitForm(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    const data = {
      patient_id: this.selectedPatientId,
      date: this.ordonnanceDate,
      details: this.details,
      medicaments: this.selectedMedicaments.map(id => ({
        id: id,
        quantite: this.medicamentQuantities[id] || 1
      }))
    };

    this.http.post('http://127.0.0.1:8000/api/ordonnances', data, { headers }).subscribe(
      res => alert('✅ Ordonnance créée avec succès'),
      err => alert("❌ Erreur lors de la création de l'ordonnance")
    );
  }
}
