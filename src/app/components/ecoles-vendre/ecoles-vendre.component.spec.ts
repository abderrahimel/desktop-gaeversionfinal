import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcolesVendreComponent } from './ecoles-vendre.component';

describe('EcolesVendreComponent', () => {
  let component: EcolesVendreComponent;
  let fixture: ComponentFixture<EcolesVendreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcolesVendreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcolesVendreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
