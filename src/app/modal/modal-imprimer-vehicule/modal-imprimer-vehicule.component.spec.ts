import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImprimerVehiculeComponent } from './modal-imprimer-vehicule.component';

describe('ModalImprimerVehiculeComponent', () => {
  let component: ModalImprimerVehiculeComponent;
  let fixture: ComponentFixture<ModalImprimerVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalImprimerVehiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalImprimerVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
