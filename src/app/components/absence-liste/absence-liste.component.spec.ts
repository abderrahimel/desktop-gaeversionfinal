import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceListeComponent } from './absence-liste.component';

describe('AbsenceListeComponent', () => {
  let component: AbsenceListeComponent;
  let fixture: ComponentFixture<AbsenceListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsenceListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
