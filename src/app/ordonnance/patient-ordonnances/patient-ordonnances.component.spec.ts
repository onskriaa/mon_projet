import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientOrdonnancesComponent } from './patient-ordonnances.component';

describe('PatientOrdonnancesComponent', () => {
  let component: PatientOrdonnancesComponent;
  let fixture: ComponentFixture<PatientOrdonnancesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientOrdonnancesComponent]
    });
    fixture = TestBed.createComponent(PatientOrdonnancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
