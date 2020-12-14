import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorNavComponent } from './indicator-nav.component';

describe('IndicatorNavComponent', () => {
  let component: IndicatorNavComponent;
  let fixture: ComponentFixture<IndicatorNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicatorNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
