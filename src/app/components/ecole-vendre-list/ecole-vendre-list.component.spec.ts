import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoleVendreListComponent } from './ecole-vendre-list.component';

describe('EcoleVendreListComponent', () => {
  let component: EcoleVendreListComponent;
  let fixture: ComponentFixture<EcoleVendreListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcoleVendreListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcoleVendreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
