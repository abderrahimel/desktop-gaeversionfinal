import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratAutoEcoleComponent } from './contrat-auto-ecole.component';

describe('ContratAutoEcoleComponent', () => {
  let component: ContratAutoEcoleComponent;
  let fixture: ComponentFixture<ContratAutoEcoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratAutoEcoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratAutoEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
