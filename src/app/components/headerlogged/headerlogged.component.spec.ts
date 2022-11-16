import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderloggedComponent } from './headerlogged.component';

describe('HeaderloggedComponent', () => {
  let component: HeaderloggedComponent;
  let fixture: ComponentFixture<HeaderloggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderloggedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderloggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
