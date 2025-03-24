import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufactureDetailsComponent } from './manufacture-details.component';

describe('ManufactureDetailsComponent', () => {
  let component: ManufactureDetailsComponent;
  let fixture: ComponentFixture<ManufactureDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufactureDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufactureDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
