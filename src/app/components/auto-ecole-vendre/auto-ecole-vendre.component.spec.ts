import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoEcoleVendreComponent } from './auto-ecole-vendre.component';

describe('AutoEcoleVendreComponent', () => {
  let component: AutoEcoleVendreComponent;
  let fixture: ComponentFixture<AutoEcoleVendreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoEcoleVendreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoEcoleVendreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
