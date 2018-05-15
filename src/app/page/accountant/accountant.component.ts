import { Component, OnInit,Input,EventEmitter, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

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
  //account_id:number;
  //public closeDetail: Function;
  
  //@Input() onSuggest:any;
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
//    this.closeDetail = this.closeModal.bind(this);
  }
  
  // closeModal(){
  //   console.log("Callback");
  //   this.modalRef.hide();
  // }
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
      //this.persons = [{ email: 'jayesh@gmail.com', username: 'jayesh', status: true, id: 1 }, { email: 'jayesh2@gmail.com', username: 'jayesh2', status: true, id: 2 }]
      //this.dtTrigger.next();
      this.common.HideSpinner();
    })
  }

  ChangeStatus(data) {
    this.common.ShowSpinner()
    this.service.ChangeStatus({emailVerify:data.email,status:data.status}).subscribe(result=>{
      //console.log(result);
      this.common.showToast("Status update successfuly","Status","success")
      this.common.HideSpinner();
    },error=>{
      console.log(error);
      this.common.HideSpinner();
      this.common.showToast("Error in update status","Status","danger")
    })
  }

  gotoEdit(data){
    this.router.navigate(['/page/accountant/edit-accountant',{email:data.email,username:data.username}]);
  }
  openModal(template: TemplateRef<any>, data, event) {
    this.detail=data;
    this.modalRef = this.modalService.show(template,this.config);
  }
  // openUserdetail(template: TemplateRef<any>,data) {
  //   //this.detail=data;
  //   this.account_id=data.id;
  //   console.log(data);
  //   let config={
  //     class: 'modal-large'
  //   };
  //   this.modalRef = this.modalService.show(template,config);
  // }
  confirm(): void {
    let self=this;
    let tmp=[];
    _.forEach(self.persons, function(value) {
        if(value.id==self.detail.id){
          value.status=!self.detail.status;
          self.ChangeStatus(value);
        }
        tmp.push(value)
    })
    
    this.persons=[];
    setTimeout(function(){
      self.persons = _.sortBy(tmp, [function(o) { return o.email; }]);
    },10)
    this.modalRef.hide();
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

