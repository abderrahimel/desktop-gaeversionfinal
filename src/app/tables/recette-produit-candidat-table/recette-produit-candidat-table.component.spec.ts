import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetteProduitCandidatTableComponent } from './recette-produit-candidat-table.component';

describe('RecetteProduitCandidatTableComponent', () => {
  let component: RecetteProduitCandidatTableComponent;
  let fixture: ComponentFixture<RecetteProduitCandidatTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecetteProduitCandidatTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetteProduitCandidatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
