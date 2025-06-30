import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

//
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AjouterMedecinComponent } from './components/ajouter-medecin/ajouter-medecin.component';
import { MedecinDashboardComponent } from './components/medecin-dashboard/medecin-dashboard.component';
import { AjouterMedicamentsComponent } from './components/ajouter-medicaments/ajouter-medicaments.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { AjouterOrdonnanceComponent } from './ordonnance/ajouter-ordonnance/ajouter-ordonnance.component';
import { ListeOrdonnanceComponent } from './ordonnance/liste-ordonnance/liste-ordonnance.component';
import { PatientOrdonnancesComponent } from './ordonnance/patient-ordonnances/patient-ordonnances.component';
import { AdminOrdonnancesComponent } from './ordonnance/admin-ordonnances/admin-ordonnances.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PatientDashboardComponent,
    AdminDashboardComponent,
    AjouterMedecinComponent,
    MedecinDashboardComponent,
    AjouterMedicamentsComponent,
    PatientsListComponent,
    AjouterOrdonnanceComponent,
    ListeOrdonnanceComponent,
    PatientOrdonnancesComponent,
    AdminOrdonnancesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
        // Ajoute ici les modules Angular Material :
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
