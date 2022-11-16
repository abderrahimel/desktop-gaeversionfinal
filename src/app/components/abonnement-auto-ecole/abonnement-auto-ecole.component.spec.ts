import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonnementAutoEcoleComponent } from './abonnement-auto-ecole.component';

describe('AbonnementAutoEcoleComponent', () => {
  let component: AbonnementAutoEcoleComponent;
  let fixture: ComponentFixture<AbonnementAutoEcoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbonnementAutoEcoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbonnementAutoEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
