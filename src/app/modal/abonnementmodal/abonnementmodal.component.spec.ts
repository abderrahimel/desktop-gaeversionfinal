import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonnementmodalComponent } from './abonnementmodal.component';

describe('AbonnementmodalComponent', () => {
  let component: AbonnementmodalComponent;
  let fixture: ComponentFixture<AbonnementmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbonnementmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbonnementmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
