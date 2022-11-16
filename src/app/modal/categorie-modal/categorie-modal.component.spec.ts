import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieModalComponent } from './categorie-modal.component';

describe('CategorieModalComponent', () => {
  let component: CategorieModalComponent;
  let fixture: ComponentFixture<CategorieModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
