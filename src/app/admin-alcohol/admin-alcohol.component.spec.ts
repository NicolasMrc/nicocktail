import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAlcoholComponent } from './admin-alcohol.component';

describe('AdminAlcoholComponent', () => {
  let component: AdminAlcoholComponent;
  let fixture: ComponentFixture<AdminAlcoholComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAlcoholComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAlcoholComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
