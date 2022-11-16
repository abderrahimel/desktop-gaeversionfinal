import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImprimerPersonnelComponent } from './modal-imprimer-personnel.component';

describe('ModalImprimerPersonnelComponent', () => {
  let component: ModalImprimerPersonnelComponent;
  let fixture: ComponentFixture<ModalImprimerPersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalImprimerPersonnelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalImprimerPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
