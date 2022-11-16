import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceTheoriquemodalComponent } from './presence-theoriquemodal.component';

describe('PresenceTheoriquemodalComponent', () => {
  let component: PresenceTheoriquemodalComponent;
  let fixture: ComponentFixture<PresenceTheoriquemodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresenceTheoriquemodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenceTheoriquemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
