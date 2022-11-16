import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitModalComponent } from './produit-modal.component';

describe('ProduitModalComponent', () => {
  let component: ProduitModalComponent;
  let fixture: ComponentFixture<ProduitModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
