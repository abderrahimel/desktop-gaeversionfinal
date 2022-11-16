import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturationFormComponent } from './facturation-form.component';

describe('FacturationFormComponent', () => {
  let component: FacturationFormComponent;
  let fixture: ComponentFixture<FacturationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
