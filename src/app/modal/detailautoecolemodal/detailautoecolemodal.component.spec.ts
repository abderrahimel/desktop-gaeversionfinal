import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailautoecolemodalComponent } from './detailautoecolemodal.component';

describe('DetailautoecolemodalComponent', () => {
  let component: DetailautoecolemodalComponent;
  let fixture: ComponentFixture<DetailautoecolemodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailautoecolemodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailautoecolemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
