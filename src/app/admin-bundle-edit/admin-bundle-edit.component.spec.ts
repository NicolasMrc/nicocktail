import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBundleEditComponent } from './admin-bundle-edit.component';

describe('AdminBundleEditComponent', () => {
  let component: AdminBundleEditComponent;
  let fixture: ComponentFixture<AdminBundleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBundleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBundleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
