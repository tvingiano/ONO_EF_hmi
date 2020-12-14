import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderGanttComponent } from './order-gantt.component';

describe('OrderGanttComponent', () => {
  let component: OrderGanttComponent;
  let fixture: ComponentFixture<OrderGanttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderGanttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderGanttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
