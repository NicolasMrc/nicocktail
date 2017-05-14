import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddToBundleComponent } from './dialog-add-to-bundle.component';

describe('DialogAddToBundleComponent', () => {
  let component: DialogAddToBundleComponent;
  let fixture: ComponentFixture<DialogAddToBundleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddToBundleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddToBundleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
