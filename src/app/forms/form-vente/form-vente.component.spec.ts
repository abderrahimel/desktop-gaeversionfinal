import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVenteComponent } from './form-vente.component';

describe('FormVenteComponent', () => {
  let component: FormVenteComponent;
  let fixture: ComponentFixture<FormVenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormVenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
