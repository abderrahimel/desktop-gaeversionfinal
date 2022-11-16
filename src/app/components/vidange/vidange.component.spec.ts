import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VidangeComponent } from './vidange.component';

describe('VidangeComponent', () => {
  let component: VidangeComponent;
  let fixture: ComponentFixture<VidangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VidangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VidangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
