import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepChartComponent } from './step-chart.component';

describe('StepChartComponent', () => {
  let component: StepChartComponent;
  let fixture: ComponentFixture<StepChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
