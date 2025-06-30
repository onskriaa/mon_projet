import { Component, OnInit } from '@angular/core';
import { OrdonnanceService } from 'src/app/services/ordonnance.service';

@Component({
  selector: 'app-patient-ordonnances',
  templateUrl: './patient-ordonnances.component.html',
  styleUrls: ['./patient-ordonnances.component.css']
})
export class PatientOrdonnancesComponent implements OnInit {
  ordonnances: any[] = [];

  constructor(private ordonnanceService: OrdonnanceService) {}

  ngOnInit(): void {
    this.ordonnanceService.getOrdonnancesForPatient().subscribe(
      (res: any) => {
        this.ordonnances = res.ordonnances ?? [];
      },
      err => {
        console.error("Erreur lors du chargement des ordonnances", err);
      }
    );
  }
}
