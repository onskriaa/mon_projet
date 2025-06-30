import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html'
})
export class PatientDashboardComponent {
  user: any;

  constructor(private auth: AuthService, private router: Router) {
    this.user = this.auth.getUser();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
