import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImprimerDepenseComponent } from './modal-imprimer-depense.component';

describe('ModalImprimerDepenseComponent', () => {
  let component: ModalImprimerDepenseComponent;
  let fixture: ComponentFixture<ModalImprimerDepenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalImprimerDepenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalImprimerDepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
