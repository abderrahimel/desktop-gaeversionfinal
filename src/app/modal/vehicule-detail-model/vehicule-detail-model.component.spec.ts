import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeDetailModelComponent } from './vehicule-detail-model.component';

describe('VehiculeDetailModelComponent', () => {
  let component: VehiculeDetailModelComponent;
  let fixture: ComponentFixture<VehiculeDetailModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculeDetailModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculeDetailModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
