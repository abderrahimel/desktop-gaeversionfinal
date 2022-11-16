import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMoniteurAbsenceModalComponent } from './update-moniteur-absence-modal.component';

describe('UpdateMoniteurTheoriqueModalComponent', () => {
  let component: UpdateMoniteurAbsenceModalComponent;
  let fixture: ComponentFixture<UpdateMoniteurAbsenceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMoniteurAbsenceModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMoniteurAbsenceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
