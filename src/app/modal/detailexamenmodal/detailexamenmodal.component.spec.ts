import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailexamenmodalComponent } from './detailexamenmodal.component';

describe('DetailexamenmodalComponent', () => {
  let component: DetailexamenmodalComponent;
  let fixture: ComponentFixture<DetailexamenmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailexamenmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailexamenmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
