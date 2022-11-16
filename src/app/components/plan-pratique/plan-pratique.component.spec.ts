import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanPratiqueComponent } from './plan-pratique.component';

describe('PlanPratiqueComponent', () => {
  let component: PlanPratiqueComponent;
  let fixture: ComponentFixture<PlanPratiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanPratiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanPratiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
