import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepensepersonnelmodalComponent } from './depensepersonnelmodal.component';

describe('DepensepersonnelmodalComponent', () => {
  let component: DepensepersonnelmodalComponent;
  let fixture: ComponentFixture<DepensepersonnelmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepensepersonnelmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepensepersonnelmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
