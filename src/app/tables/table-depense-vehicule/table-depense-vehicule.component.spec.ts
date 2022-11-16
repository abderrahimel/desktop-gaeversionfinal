import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDepenseVehiculeComponent } from './table-depense-vehicule.component';

describe('TableDepenseVehiculeComponent', () => {
  let component: TableDepenseVehiculeComponent;
  let fixture: ComponentFixture<TableDepenseVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDepenseVehiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDepenseVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
