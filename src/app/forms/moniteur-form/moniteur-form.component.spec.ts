import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoniteurFormComponent } from './moniteur-form.component';

describe('MoniteurFormComponent', () => {
  let component: MoniteurFormComponent;
  let fixture: ComponentFixture<MoniteurFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoniteurFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoniteurFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
