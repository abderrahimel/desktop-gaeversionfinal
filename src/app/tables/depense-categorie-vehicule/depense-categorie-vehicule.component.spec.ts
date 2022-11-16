import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepenseCategorieVehiculeComponent } from './depense-categorie-vehicule.component';

describe('DepenseCategorieVehiculeComponent', () => {
  let component: DepenseCategorieVehiculeComponent;
  let fixture: ComponentFixture<DepenseCategorieVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepenseCategorieVehiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepenseCategorieVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
