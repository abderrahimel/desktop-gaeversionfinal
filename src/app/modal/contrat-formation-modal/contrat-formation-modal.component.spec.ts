import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratFormationModalComponent } from './contrat-formation-modal.component';

describe('ContratFormationModalComponent', () => {
  let component: ContratFormationModalComponent;
  let fixture: ComponentFixture<ContratFormationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratFormationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratFormationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
