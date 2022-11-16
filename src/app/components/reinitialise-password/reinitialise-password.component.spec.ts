import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinitialisePasswordComponent } from './reinitialise-password.component';

describe('ReinitialisePasswordComponent', () => {
  let component: ReinitialisePasswordComponent;
  let fixture: ComponentFixture<ReinitialisePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReinitialisePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReinitialisePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
