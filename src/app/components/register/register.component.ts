import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formData = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    date_naissance: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.register(this.formData).subscribe(
      res => {
        console.log('Inscription réussie :', res);
        alert('Compte créé avec succès !');
        this.router.navigate(['/login']);
      },
      err => {
        console.error('Erreur d\'inscription :', err);
        alert('Erreur lors de l\'inscription. Vérifie les champs.');
      }
    );
  }
  
}
