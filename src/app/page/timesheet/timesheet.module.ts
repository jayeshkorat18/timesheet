import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule} from '../../shared.module';
import { TimesheetComponent } from './timesheet.component';
import { AddTimesheetComponent } from './add-timesheet/add-timesheet.component';

export const routes = [
  { path: '', component: TimesheetComponent, pathMatch: 'full' },
  { path: 'add-timesheet', component: AddTimesheetComponent,data:{title:'Add Timesheet'}}
];
 
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    UiSwitchModule,
    SharedModule
  ],
  declarations: [TimesheetComponent, AddTimesheetComponent]
})
export class TimesheetModule { }
