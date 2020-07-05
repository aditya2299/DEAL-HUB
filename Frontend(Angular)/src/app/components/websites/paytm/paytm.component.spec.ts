import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaytmComponent } from './paytm.component';

describe('PaytmComponent', () => {
  let component: PaytmComponent;
  let fixture: ComponentFixture<PaytmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaytmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaytmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
