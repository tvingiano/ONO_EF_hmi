import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeSettingsModalComponent } from './recipe-settings-modal.component';

describe('RecipeSettingsModalComponent', () => {
  let component: RecipeSettingsModalComponent;
  let fixture: ComponentFixture<RecipeSettingsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeSettingsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeSettingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
