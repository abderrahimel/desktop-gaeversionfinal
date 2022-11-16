import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsCandidatsComponent } from './results-candidats.component';

describe('ResultsCandidatsComponent', () => {
  let component: ResultsCandidatsComponent;
  let fixture: ComponentFixture<ResultsCandidatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsCandidatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsCandidatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
