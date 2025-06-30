import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdonnancesComponent } from './admin-ordonnances.component';

describe('AdminOrdonnancesComponent', () => {
  let component: AdminOrdonnancesComponent;
  let fixture: ComponentFixture<AdminOrdonnancesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOrdonnancesComponent]
    });
    fixture = TestBed.createComponent(AdminOrdonnancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
