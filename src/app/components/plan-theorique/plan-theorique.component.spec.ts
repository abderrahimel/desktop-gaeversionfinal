import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanTheoriqueComponent } from './plan-theorique.component';

describe('PlanTheoriqueComponent', () => {
  let component: PlanTheoriqueComponent;
  let fixture: ComponentFixture<PlanTheoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanTheoriqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanTheoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
