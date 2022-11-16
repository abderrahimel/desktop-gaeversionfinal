import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCoursSupplementaireComponent } from './table-cours-supplementaire.component';

describe('TableCoursSupplementaireComponent', () => {
  let component: TableCoursSupplementaireComponent;
  let fixture: ComponentFixture<TableCoursSupplementaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCoursSupplementaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCoursSupplementaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
