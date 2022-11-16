import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatFormationModalComponent } from './certificat-formation-modal.component';

describe('CertificatFormationModalComponent', () => {
  let component: CertificatFormationModalComponent;
  let fixture: ComponentFixture<CertificatFormationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificatFormationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatFormationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
