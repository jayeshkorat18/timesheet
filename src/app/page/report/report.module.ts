import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { NgbModule,NgbDateParserFormatter  } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateFRParserFormatter } from './../../shared/helper/ngb-date-fr-parser-formatter';
import { SharedModule} from '../../shared.module';
import { CandidateTimesheetComponent } from './candidate-timesheet/candidate-timesheet.component';
import { TimesheetStatusComponent } from './timesheet-status/timesheet-status.component';
import { TimesheetBydateComponent } from './timesheet-bydate/timesheet-bydate.component';

export const routes = [
  { path: '', component: CandidateTimesheetComponent, pathMatch: 'full' },
  { path: 'candidate-timesheet', component: CandidateTimesheetComponent,data:{title:'Candidate Timesheet report'}},
  { path: 'timesheet-status', component: TimesheetStatusComponent,data:{title:'Timesheet report'}},
  { path: 'timesheet-bydate', component: TimesheetBydateComponent,data:{title:'Timesheet report'}},
];

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    RouterModule.forChild(routes),
    DataTablesModule,
    UiSwitchModule,
    SharedModule,
  ],
  declarations: [CandidateTimesheetComponent, TimesheetStatusComponent, TimesheetBydateComponent],
  providers:[{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})
export class ReportModule { }
