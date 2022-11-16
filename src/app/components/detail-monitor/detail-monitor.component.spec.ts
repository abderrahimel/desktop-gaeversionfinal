import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMonitorComponent } from './detail-monitor.component';

describe('DetailMonitorComponent', () => {
  let component: DetailMonitorComponent;
  let fixture: ComponentFixture<DetailMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMonitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
