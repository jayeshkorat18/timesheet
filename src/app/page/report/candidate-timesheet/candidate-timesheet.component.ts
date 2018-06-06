import { Component, OnInit } from '@angular/core';
import { UiSwitchModule } from 'ngx-toggle-switch';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { CommonService } from '../../../shared/service/common.service';
import { WebserviceService } from '../../../shared/service/webservice.service';
@Component({
  selector: 'app-candidate-timesheet',
  templateUrl: './candidate-timesheet.component.html',
  styleUrls: ['./candidate-timesheet.component.scss']
})
export class CandidateTimesheetComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  persons: any = [];
  dtTrigger: Subject<any> = new Subject();
  constructor(public common: CommonService, public service: WebserviceService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      columnDefs: [
        { "orderable": false, "targets": [-1, 0, 1, 2, 3] },
        { "orderable": false, "targets": 'nosort' }
      ]
    };
    this.AccountantList();
  }

  //Get List of accountant
  AccountantList() {
    this.common.ShowSpinner();
    this.service.getCandidateList().subscribe(result => {
      //console.log(result);
      if(result.status==1){
        this.persons = result.data;
        this.dtTrigger.next();
        
      }
      this.common.HideSpinner();
    }, error => {
      console.log(error);
      this.common.HideSpinner();
    })
  }
}
