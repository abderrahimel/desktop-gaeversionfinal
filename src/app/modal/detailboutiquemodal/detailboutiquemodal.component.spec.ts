import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailboutiquemodalComponent } from './detailboutiquemodal.component';

describe('DetailboutiquemodalComponent', () => {
  let component: DetailboutiquemodalComponent;
  let fixture: ComponentFixture<DetailboutiquemodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailboutiquemodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailboutiquemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
