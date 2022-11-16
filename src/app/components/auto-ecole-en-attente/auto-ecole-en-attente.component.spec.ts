import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoEcoleEnAttenteComponent } from './auto-ecole-en-attente.component';

describe('AutoEcoleEnAttenteComponent', () => {
  let component: AutoEcoleEnAttenteComponent;
  let fixture: ComponentFixture<AutoEcoleEnAttenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoEcoleEnAttenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoEcoleEnAttenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
