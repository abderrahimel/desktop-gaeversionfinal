import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoniteurModalComponent } from './moniteur-modal.component';

describe('MoniteurModalComponent', () => {
  let component: MoniteurModalComponent;
  let fixture: ComponentFixture<MoniteurModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoniteurModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoniteurModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
