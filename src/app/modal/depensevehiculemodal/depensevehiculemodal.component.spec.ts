import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepensevehiculemodalComponent } from './depensevehiculemodal.component';

describe('DepensevehiculemodalComponent', () => {
  let component: DepensevehiculemodalComponent;
  let fixture: ComponentFixture<DepensevehiculemodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepensevehiculemodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepensevehiculemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
