import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoutiqueComponent } from './admin-boutique.component';

describe('AdminBoutiqueComponent', () => {
  let component: AdminBoutiqueComponent;
  let fixture: ComponentFixture<AdminBoutiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBoutiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBoutiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
