import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAbsenceMoniteurComponent } from './add-absence-moniteur.component';

describe('AddAbsenceMoniteurComponent', () => {
  let component: AddAbsenceMoniteurComponent;
  let fixture: ComponentFixture<AddAbsenceMoniteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAbsenceMoniteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAbsenceMoniteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
