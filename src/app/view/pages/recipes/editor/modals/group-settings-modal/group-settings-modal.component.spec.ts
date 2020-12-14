import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSettingsModalComponent } from './group-settings-modal.component';

describe('GroupSettingsModalComponent', () => {
  let component: GroupSettingsModalComponent;
  let fixture: ComponentFixture<GroupSettingsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupSettingsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSettingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
