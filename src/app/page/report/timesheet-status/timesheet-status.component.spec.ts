import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetStatusComponent } from './timesheet-status.component';

describe('TimesheetStatusComponent', () => {
  let component: TimesheetStatusComponent;
  let fixture: ComponentFixture<TimesheetStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
