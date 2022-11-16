import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresencePratiqueFormComponent } from './presence-pratique-form.component';

describe('PresencePratiqueFormComponent', () => {
  let component: PresencePratiqueFormComponent;
  let fixture: ComponentFixture<PresencePratiqueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresencePratiqueFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresencePratiqueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
