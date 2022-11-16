import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAutoEcoleComponent } from './update-auto-ecole.component';

describe('UpdateAutoEcoleComponent', () => {
  let component: UpdateAutoEcoleComponent;
  let fixture: ComponentFixture<UpdateAutoEcoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAutoEcoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAutoEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
