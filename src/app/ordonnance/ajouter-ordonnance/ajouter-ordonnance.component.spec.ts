import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterOrdonnanceComponent } from './ajouter-ordonnance.component';

describe('AjouterOrdonnanceComponent', () => {
  let component: AjouterOrdonnanceComponent;
  let fixture: ComponentFixture<AjouterOrdonnanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterOrdonnanceComponent]
    });
    fixture = TestBed.createComponent(AjouterOrdonnanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
