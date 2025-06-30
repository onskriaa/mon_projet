import { Component, OnInit } from '@angular/core';
import { OrdonnanceService } from 'src/app/services/ordonnance.service';

@Component({
  selector: 'app-admin-ordonnances',
  templateUrl: './admin-ordonnances.component.html',
  styleUrls: ['./admin-ordonnances.component.css']
})
export class AdminOrdonnancesComponent implements OnInit {
  ordonnances: any[] = [];

  constructor(private ordonnanceService: OrdonnanceService) {}

  ngOnInit(): void {
    this.ordonnanceService.getAllOrdonnances().subscribe(
      (res: any) => {
        this.ordonnances = res.ordonnances ?? [];
      },
      err => {
        console.error("❌ Erreur lors du chargement des ordonnances", err);
      }
    );
  }
}
