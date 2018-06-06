import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetBydateComponent } from './timesheet-bydate.component';

describe('TimesheetBydateComponent', () => {
  let component: TimesheetBydateComponent;
  let fixture: ComponentFixture<TimesheetBydateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetBydateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetBydateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
