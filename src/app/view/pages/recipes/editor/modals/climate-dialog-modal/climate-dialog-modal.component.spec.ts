import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimateDialogModalComponent } from './climate-dialog-modal.component';

describe('LightDialogModalComponent', () => {
  let component: ClimateDialogModalComponent;
  let fixture: ComponentFixture<ClimateDialogModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClimateDialogModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClimateDialogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
