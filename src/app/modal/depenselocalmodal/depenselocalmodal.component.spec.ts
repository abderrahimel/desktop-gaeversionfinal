import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepenselocalmodalComponent } from './depenselocalmodal.component';

describe('DepenselocalmodalComponent', () => {
  let component: DepenselocalmodalComponent;
  let fixture: ComponentFixture<DepenselocalmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepenselocalmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepenselocalmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
