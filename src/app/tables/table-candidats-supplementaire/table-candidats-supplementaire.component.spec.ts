import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCandidatsSupplementaireComponent } from './table-candidats-supplementaire.component';

describe('TableCandidatsSupplementaireComponent', () => {
  let component: TableCandidatsSupplementaireComponent;
  let fixture: ComponentFixture<TableCandidatsSupplementaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCandidatsSupplementaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCandidatsSupplementaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
