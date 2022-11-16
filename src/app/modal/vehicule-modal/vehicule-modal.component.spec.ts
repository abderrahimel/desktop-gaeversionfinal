import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeModalComponent } from './vehicule-modal.component';

describe('VehiculeModalComponent', () => {
  let component: VehiculeModalComponent;
  let fixture: ComponentFixture<VehiculeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
