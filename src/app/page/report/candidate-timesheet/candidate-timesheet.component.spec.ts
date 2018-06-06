import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateTimesheetComponent } from './candidate-timesheet.component';

describe('CandidateTimesheetComponent', () => {
  let component: CandidateTimesheetComponent;
  let fixture: ComponentFixture<CandidateTimesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateTimesheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
