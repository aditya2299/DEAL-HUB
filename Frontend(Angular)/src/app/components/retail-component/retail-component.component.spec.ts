import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailComponentComponent } from './retail-component.component';

describe('RetailComponentComponent', () => {
  let component: RetailComponentComponent;
  let fixture: ComponentFixture<RetailComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
