import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresencePratiqueComponent } from './presence-pratique.component';

describe('PresencePratiqueComponent', () => {
  let component: PresencePratiqueComponent;
  let fixture: ComponentFixture<PresencePratiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresencePratiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresencePratiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
