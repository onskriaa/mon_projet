import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-medecin-dashboard',
  templateUrl: './medecin-dashboard.component.html',
  styleUrls: ['./medecin-dashboard.component.css']
})
export class MedecinDashboardComponent {
  user: any;

  constructor(private auth: AuthService) {
    this.user = this.auth.getUser(); 
  }

  logout() {
    this.auth.logout();
    window.location.href = '/login';
  }
}
