import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateexamenmodalComponent } from './updateexamenmodal.component';

describe('UpdateexamenmodalComponent', () => {
  let component: UpdateexamenmodalComponent;
  let fixture: ComponentFixture<UpdateexamenmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateexamenmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateexamenmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
