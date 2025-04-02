import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsrecipientComponent } from './detailsrecipient.component';

describe('DetailsrecipientComponent', () => {
  let component: DetailsrecipientComponent;
  let fixture: ComponentFixture<DetailsrecipientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsrecipientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsrecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
