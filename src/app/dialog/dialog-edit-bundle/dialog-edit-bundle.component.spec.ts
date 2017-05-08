import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditBundleComponent } from './dialog-edit-bundle.component';

describe('DialogEditBundleComponent', () => {
  let component: DialogEditBundleComponent;
  let fixture: ComponentFixture<DialogEditBundleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditBundleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditBundleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
