import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAutoEcoleComponent } from './detail-auto-ecole.component';

describe('DetailAutoEcoleComponent', () => {
  let component: DetailAutoEcoleComponent;
  let fixture: ComponentFixture<DetailAutoEcoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailAutoEcoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAutoEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
