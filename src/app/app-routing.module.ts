import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AjouterMedecinComponent } from './components/ajouter-medecin/ajouter-medecin.component';
import { MedecinDashboardComponent } from './components/medecin-dashboard/medecin-dashboard.component';
import { AjouterMedicamentsComponent } from './components/ajouter-medicaments/ajouter-medicaments.component';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { AjouterOrdonnanceComponent } from './ordonnance/ajouter-ordonnance/ajouter-ordonnance.component';
import { ListeOrdonnanceComponent } from './ordonnance/liste-ordonnance/liste-ordonnance.component'; // ✅ L'IMPORT
import { PatientOrdonnancesComponent } from './ordonnance/patient-ordonnances/patient-ordonnances.component';
import { AdminOrdonnancesComponent } from './ordonnance/admin-ordonnances/admin-ordonnances.component';






const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  // Tu ajouteras les routes protégées ici plus tard
  { path: 'patient', component: PatientDashboardComponent },
  { path: 'patient', component: PatientDashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'ajouter-medecin', component: AjouterMedecinComponent },
  { path: 'medecin', component: MedecinDashboardComponent },
  { path: 'ajouter-medicament', component: AjouterMedicamentsComponent },
  { path: 'liste-patients', component: PatientsListComponent },
  { path: 'ajouter-ordonnance', component: AjouterOrdonnanceComponent },
  { path: 'liste-ordonnance', component: ListeOrdonnanceComponent },
  { path: 'patient-ordonnances', component: PatientOrdonnancesComponent }, // ✅ ajoute cette ligne
  { path: 'admin-ordonnances', component: AdminOrdonnancesComponent },










];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
