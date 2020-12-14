import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionDialogModalComponent } from './solution-dialog-modal.component';

describe('LightDialogModalComponent', () => {
  let component: SolutionDialogModalComponent;
  let fixture: ComponentFixture<SolutionDialogModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionDialogModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionDialogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
