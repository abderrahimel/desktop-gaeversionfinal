import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEcoleVendreComponent } from './detail-ecole-vendre.component';

describe('DetailEcoleVendreComponent', () => {
  let component: DetailEcoleVendreComponent;
  let fixture: ComponentFixture<DetailEcoleVendreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailEcoleVendreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEcoleVendreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
