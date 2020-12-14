import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresFormulaComponent } from './pres-formula.component';

describe('PresFormulaComponent', () => {
  let component: PresFormulaComponent;
  let fixture: ComponentFixture<PresFormulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresFormulaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
