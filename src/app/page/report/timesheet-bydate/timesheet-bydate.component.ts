import { Component, OnInit } from '@angular/core';
import { UiSwitchModule } from 'ngx-toggle-switch';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { CommonService } from '../../../shared/service/common.service';
import { WebserviceService } from '../../../shared/service/webservice.service';

@Component({
  selector: 'app-timesheet-bydate',
  templateUrl: './timesheet-bydate.component.html',
  styleUrls: ['./timesheet-bydate.component.scss']
})
export class TimesheetBydateComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  timesheet: any = [];
  dtTrigger: Subject<any> = new Subject();

  constructor( public common: CommonService, public service: WebserviceService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      columnDefs: [
        { "orderable": false, "targets":  [ -1,0,1,2,3 ] },
        { "orderable":false,"targets":'nosort'}
      ]
    };
    this.TimesheetList(42); 
  }
  TimesheetList(account_id){
    this.common.ShowSpinner();
    this.service.TimesheetListById(account_id).subscribe(result=>{
      console.log(result);
      if(result.length>0){
        this.timesheet=result;
        this.dtTrigger.next();
      }else{
        this.timesheet=[];
      }
      this.common.HideSpinner();
    },error=>{
      console.log(error)
      this.common.HideSpinner();
    })
  }
 
}
