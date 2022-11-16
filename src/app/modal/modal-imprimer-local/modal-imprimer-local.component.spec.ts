import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImprimerLocalComponent } from './modal-imprimer-local.component';

describe('ModalImprimerLocalComponent', () => {
  let component: ModalImprimerLocalComponent;
  let fixture: ComponentFixture<ModalImprimerLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalImprimerLocalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalImprimerLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
