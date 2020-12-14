import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightDialogModalComponent } from './light-dialog-modal.component';

describe('LightDialogModalComponent', () => {
  let component: LightDialogModalComponent;
  let fixture: ComponentFixture<LightDialogModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightDialogModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightDialogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
