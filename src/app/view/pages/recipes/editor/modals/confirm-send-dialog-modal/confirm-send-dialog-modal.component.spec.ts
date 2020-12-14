import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmSendDialogModalComponent } from './confirm-send-dialog-modal.component';

describe('ConfirmSendDialogModalComponent', () => {
  let component: ConfirmSendDialogModalComponent;
  let fixture: ComponentFixture<ConfirmSendDialogModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmSendDialogModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmSendDialogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
