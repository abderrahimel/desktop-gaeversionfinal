import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceMoniteurComponent } from './absence-moniteur.component';

describe('AbsenceMoniteurComponent', () => {
  let component: AbsenceMoniteurComponent;
  let fixture: ComponentFixture<AbsenceMoniteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsenceMoniteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceMoniteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
