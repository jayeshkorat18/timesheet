import { Component, OnInit,Input,EventEmitter, ViewChild,TemplateRef } from '@angular/core';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { DataTableDirective } from 'angular-datatables';

import { CommonService } from '../../shared/service/common.service';
import { WebserviceService } from '../../shared/service/webservice.service';

@Component({
  selector: 'app-accountant',
  templateUrl: './accountant.component.html',
  styleUrls: ['./accountant.component.scss']
})

export class AccountantComponent implements OnInit {
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-md'
  };
  closeResult: string;
  dtOptions: DataTables.Settings = {};
  persons: any = [];
  dtTrigger: Subject<any> = new Subject();
  detail:any;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  constructor(public router: Router,private modalService: BsModalService, public common: CommonService, public service: WebserviceService) { }
  
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      columnDefs: [
        { "orderable": false, "targets":  [ -1,0,1,2,3 ] },
        { "orderable":false,"targets":'nosort'}
      ]
    };
    this.AccountantList();
  }
  
  //Get List of accountant
  AccountantList() {
    this.common.ShowSpinner();
    this.service.AccountantList(1).subscribe(result => {
      //console.log(result);
      this.persons = result;
      this.dtTrigger.next();
      this.common.HideSpinner();
    }, error => {
      console.log(error);
      this.common.HideSpinner();
    })
  }

  gotoEdit(data){
    this.router.navigate(['/page/accountant/edit-accountant',{email:data.email,username:data.username}]);
  }
  openModal(template: TemplateRef<any>, data, event) {
    this.detail=data;
    this.modalRef = this.modalService.show(template,this.config);
  }

  confirm(): void {
    let self=this;
    let tmp=[];
    let data;
    _.forEach(self.persons, function(value) {
        if(value.id==self.detail.id){
          value.status=!self.detail.status;
          data=value;
        }
        tmp.push(value)
    })
    
    this.common.ShowSpinner()
    this.service.ChangeStatus({emailVerify:data.email,status:data.status}).subscribe(result=>{
      this.common.showToast("Status update successfuly","Status","success")
      this.common.HideSpinner();
    },error=>{
      this.reloadTable(this.persons);
      console.log(error);
      this.common.HideSpinner();
      this.common.showToast("Error in update status","Status","danger")
    })
    this.modalRef.hide();
  }
  reloadTable(data){
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Switch
      this.persons = data;
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  decline(): void {
    let self=this;
    let tmp=this.persons;
    this.persons=[];
    setTimeout(function(){
      self.persons =  _.sortBy(tmp, [function(o) { return o.email; }]);
    },10)
    this.modalRef.hide();
  }
}

