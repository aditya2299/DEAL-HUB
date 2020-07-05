import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineComponentComponent } from './online-component.component';

describe('OnlineComponentComponent', () => {
  let component: OnlineComponentComponent;
  let fixture: ComponentFixture<OnlineComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
