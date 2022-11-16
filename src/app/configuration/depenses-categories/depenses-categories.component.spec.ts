import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepensesCategoriesComponent } from './depenses-categories.component';

describe('DepensesCategoriesComponent', () => {
  let component: DepensesCategoriesComponent;
  let fixture: ComponentFixture<DepensesCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepensesCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepensesCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
