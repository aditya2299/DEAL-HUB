import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CromaComponent } from './croma.component';

describe('CromaComponent', () => {
  let component: CromaComponent;
  let fixture: ComponentFixture<CromaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CromaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CromaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
