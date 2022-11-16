import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeOccasionsComponent } from './vehicule-occasions.component';

describe('VehiculeOccasionsComponent', () => {
  let component: VehiculeOccasionsComponent;
  let fixture: ComponentFixture<VehiculeOccasionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculeOccasionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculeOccasionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
