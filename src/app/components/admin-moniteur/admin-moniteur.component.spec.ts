import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMoniteurComponent } from './admin-moniteur.component';

describe('AdminMoniteurComponent', () => {
  let component: AdminMoniteurComponent;
  let fixture: ComponentFixture<AdminMoniteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMoniteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMoniteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
