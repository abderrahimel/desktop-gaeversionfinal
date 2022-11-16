import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicielGaePlusComponent } from './logiciel-gae-plus.component';

describe('LogicielGaePlusComponent', () => {
  let component: LogicielGaePlusComponent;
  let fixture: ComponentFixture<LogicielGaePlusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogicielGaePlusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicielGaePlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
