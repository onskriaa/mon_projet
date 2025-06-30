import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    // ✅ Si déjà connecté, rediriger vers le bon dashboard
    const user = this.auth.getUser();

    if (user && user.role) {
      if (user.role === 'admin') {
        this.router.navigate(['/admin']);
      } else if (user.role === 'medecin') {
        this.router.navigate(['/medecin']);
      } else if (user.role === 'patient') {
        this.router.navigate(['/patient']);
      }
    }
  }

  onSubmit(): void {
    this.auth.login(this.credentials).subscribe(
      res => {
        console.log('Connexion réussie', res);

        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));

        if (res.user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else if (res.user.role === 'medecin') {
          this.router.navigate(['/medecin']);
        } else if (res.user.role === 'patient') {
          this.router.navigate(['/patient']);
        }
      },
      err => {
        alert('Échec de la connexion. Vérifie tes informations.');
        console.error(err);
      }
    );
  }
}
