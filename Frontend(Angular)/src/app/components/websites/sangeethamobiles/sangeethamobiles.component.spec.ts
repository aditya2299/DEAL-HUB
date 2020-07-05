import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SangeethamobilesComponent } from './sangeethamobiles.component';

describe('SangeethamobilesComponent', () => {
  let component: SangeethamobilesComponent;
  let fixture: ComponentFixture<SangeethamobilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SangeethamobilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SangeethamobilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
