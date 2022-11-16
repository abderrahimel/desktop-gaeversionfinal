import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AproposComponent } from './apropos.component';

describe('ProposComponent', () => {
  let component: AproposComponent;
  let fixture: ComponentFixture<AproposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AproposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
