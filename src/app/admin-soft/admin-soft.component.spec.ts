import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSoftComponent } from './admin-soft.component';

describe('AdminSoftComponent', () => {
  let component: AdminSoftComponent;
  let fixture: ComponentFixture<AdminSoftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSoftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSoftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
