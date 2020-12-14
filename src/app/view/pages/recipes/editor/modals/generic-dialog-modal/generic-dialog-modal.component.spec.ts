import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericDialogModalComponent } from './generic-dialog-modal.component';

describe('LightDialogModalComponent', () => {
  let component: GenericDialogModalComponent;
  let fixture: ComponentFixture<GenericDialogModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericDialogModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericDialogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
