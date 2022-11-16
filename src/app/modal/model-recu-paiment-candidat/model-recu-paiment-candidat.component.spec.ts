import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelRecuPaimentCandidatComponent } from './model-recu-paiment-candidat.component';

describe('ModelRecuPaimentCandidatComponent', () => {
  let component: ModelRecuPaimentCandidatComponent;
  let fixture: ComponentFixture<ModelRecuPaimentCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelRecuPaimentCandidatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelRecuPaimentCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
