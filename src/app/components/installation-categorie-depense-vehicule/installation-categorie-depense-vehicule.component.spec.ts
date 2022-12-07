import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationCategorieDepenseVehiculeComponent } from './installation-categorie-depense-vehicule.component';

describe('InstallationCategorieDepenseVehiculeComponent', () => {
  let component: InstallationCategorieDepenseVehiculeComponent;
  let fixture: ComponentFixture<InstallationCategorieDepenseVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallationCategorieDepenseVehiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationCategorieDepenseVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
