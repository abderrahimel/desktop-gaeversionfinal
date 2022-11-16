import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDepenseLocalComponent } from './table-depense-local.component';

describe('TableDepenseLocalComponent', () => {
  let component: TableDepenseLocalComponent;
  let fixture: ComponentFixture<TableDepenseLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDepenseLocalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDepenseLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
