import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBundleNewComponent } from './admin-bundle-new.component';

describe('AdminBundleNewComponent', () => {
  let component: AdminBundleNewComponent;
  let fixture: ComponentFixture<AdminBundleNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBundleNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBundleNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
