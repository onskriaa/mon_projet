import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeOrdonnanceComponent } from './liste-ordonnance.component';

describe('ListeOrdonnanceComponent', () => {
  let component: ListeOrdonnanceComponent;
  let fixture: ComponentFixture<ListeOrdonnanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeOrdonnanceComponent]
    });
    fixture = TestBed.createComponent(ListeOrdonnanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
