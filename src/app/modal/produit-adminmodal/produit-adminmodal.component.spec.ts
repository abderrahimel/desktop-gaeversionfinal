import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitAdminmodalComponent } from './produit-adminmodal.component';

describe('ProduitAdminmodalComponent', () => {
  let component: ProduitAdminmodalComponent;
  let fixture: ComponentFixture<ProduitAdminmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitAdminmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitAdminmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
