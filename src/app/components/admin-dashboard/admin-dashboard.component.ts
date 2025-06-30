import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  user: any;

  constructor(private auth: AuthService) {
    this.user = this.auth.getUser(); // Récupère l'admin connecté
  }

  logout() {
    this.auth.logout();
    window.location.href = '/login'; // Redirection manuelle
  }
}
