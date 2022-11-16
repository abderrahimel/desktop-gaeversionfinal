import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceMoniteurModalComponent } from './absence-moniteur-modal.component';

describe('AbsenceMoniteurModalComponent', () => {
  let component: AbsenceMoniteurModalComponent;
  let fixture: ComponentFixture<AbsenceMoniteurModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsenceMoniteurModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceMoniteurModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
