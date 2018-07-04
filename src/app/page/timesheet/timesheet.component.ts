import { Component, OnInit,Input,EventEmitter, TemplateRef } from '@angular/core';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { CommonService } from '../../shared/service/common.service';
import { WebserviceService } from '../../shared/service/webservice.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
  public downloadURL:string='https://api-timesheets.herokuapp.com/api/containers/tekreliance/download/';
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-md'
  };
  closeResult: string;
  dtOptions: DataTables.Settings = {};
  timesheet: any = [];
  dtTrigger: Subject<any> = new Subject();
  detail:any;
  account_id:number;
  userDetail:any;
  candidateList:any;
  isNoData:boolean=false;
  timesheetDetail:any;
  paidmsg:any='Are you sure you want to mark as paid';
  constructor(public router: Router, public activatedRoute: ActivatedRoute,private modalService: BsModalService, public common: CommonService, public service: WebserviceService) {
    this.userDetail=JSON.parse(localStorage.getItem('UserData'))

    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      if (Boolean(params.id)) {
        this.account_id=params.id;
       // this.AccountantDetail(params.id);
      } else {
        this.account_id=this.userDetail.user.id;
      }
    })
   }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      columnDefs: [
        { "orderable": false, "targets":  [ -1,0,1,2,3 ] },
        { "orderable":false,"targets":'nosort'}
      ]
    };
    this.TimesheetList(this.account_id);    
   // this.GetCandidateList();
  }

  //Get List of accountant
  // GetCandidateList() {
  //   this.common.ShowSpinner();
  //   this.service.getCandidateList().subscribe(result => {
  //     //console.log(result);
  //     this.candidateList=result;
  //     this.account_id=result[0].id;
  //     this.TimesheetList(this.account_id);    
  //     this.common.HideSpinner();
  //   }, error => {
  //     console.log(error);
  //     //this.persons = [{ email: 'jayesh@gmail.com', username: 'jayesh', status: true, id: 1 }, { email: 'jayesh2@gmail.com', username: 'jayesh2', status: true, id: 2 }]
  //     //this.dtTrigger.next();
  //     this.common.HideSpinner();
  //   })
  // }

  TimesheetList(account_id){
    this.common.ShowSpinner();
    this.service.TimesheetListById(account_id).subscribe(result=>{
      console.log(result);
      if(result.length>0){
        this.timesheet=result;
        this.dtTrigger.next();
      }else{
        this.timesheet=[];
        this.isNoData=true;
      }
      this.common.HideSpinner();
    },error=>{
      console.log(error)
      this.common.HideSpinner();
    })
  }

  openModal(template: TemplateRef<any>, data) {
    this.detail=data;
    this.modalRef = this.modalService.show(template,this.config);
  }

  confirm(): void {
    let self=this;
    let tmp=[];
    _.forEach(self.timesheet, function(value) {
        if(value.id==self.detail.id){
          value.isBilled=!self.detail.isBilled;
          self.MarkAsBilled(value);
        }
        tmp.push(value)
    })
    
    this.timesheet=[];
    setTimeout(function(){
      self.timesheet = _.sortBy(tmp, [function(o) { return o.date; }]);
    },10)
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  //Change status of billed
  MarkAsBilled(param){
    this.common.ShowSpinner()
    this.service.MarkAsBilled({timesheetId:"171",isBilled:true}).subscribe(result=>{
      console.log(result)
      if(result=="Timesheet is billed changes success"){
        this.common.showToast("Status update successfuly","Status","success")
      }else{
        this.common.showToast("Error in update status","Status","danger")  
      }
      this.common.HideSpinner();
    },error=>{
      console.log(error)
      this.common.HideSpinner();
      this.common.showToast("Error in update status","Status","danger")
    })
  }

  //Change payment status
  openModalPaid(template: TemplateRef<any>, data,msg) {
    this.detail=data;
    this.paidmsg=msg;
    this.modalRef = this.modalService.show(template,this.config);
  }
  paidconfirm(): void {
    let self=this;
    let tmp=[];
    _.forEach(self.timesheet, function(value) {
        if(value.id==self.detail.id){
          value.isPaidByClient=!self.detail.isPaidByClient;
          self.MarkAsPaid(value);
        }
        tmp.push(value)
    })
    
    this.timesheet=[];
    setTimeout(function(){
      self.timesheet = _.sortBy(tmp, [function(o) { return o.date; }]);
    },10)
    this.modalRef.hide();
  }

  //Change status of payment
  MarkAsPaid(param){
    this.common.ShowSpinner()
    this.service.MarkAsPaid({timesheetId:param.id,isPaid:true}).subscribe(result=>{
      console.log(result)
      //this.common.showToast("Status update successfuly","Status","success")
      this.common.HideSpinner();
    },error=>{
      console.log(error)
      this.common.HideSpinner();
      this.common.showToast("Error in update status","Status","danger")
    })
  }

  openModalStatusApprove(template: TemplateRef<any>, data) {
    this.detail=data;
    this.modalRef = this.modalService.show(template,this.config);
  }
  approveStatus(){
    let self=this;
    let tmp=[];
    _.forEach(self.timesheet, function(value) {
        if(value.id==self.detail.id){
          value.status=2;
          self.ChangeTimesheetStatus(value);
        }
        tmp.push(value)
    })
    
    this.timesheet=[];
    setTimeout(function(){
      self.timesheet = _.sortBy(tmp, [function(o) { return o.date; }]);
    },10)
    this.modalRef.hide();
  }
  openModalStatusReject(template: TemplateRef<any>, data) {
    this.detail=data;
    this.modalRef = this.modalService.show(template,this.config);
  }
  rejectStatus(){
    let self=this;
    let tmp=[];
    _.forEach(self.timesheet, function(value) {
        if(value.id==self.detail.id){
          value.status=3;
          self.ChangeTimesheetStatus(value);
        }
        tmp.push(value)
    })
    
    this.timesheet=[];
    setTimeout(function(){
      self.timesheet = _.sortBy(tmp, [function(o) { return o.date; }]);
    },10)
    this.modalRef.hide();
  }
  ChangeTimesheetStatus(param){
    this.common.ShowSpinner()
    this.service.ChangeTimesheetStatus({timesheetId:param.id,status:param.status}).subscribe(result=>{
      console.log(result)
      this.common.showToast("Status update successfuly","Status","success")
      this.common.HideSpinner();
    },error=>{
      console.log(error)
      this.common.HideSpinner();
      this.common.showToast("Error in update status","Status","danger")
    })
  }

  //Change hours by candidate
  openModalChangeHours(template: TemplateRef<any>, data) {
    console.log(data)
    this.timesheetDetail=data;
    this.modalRef = this.modalService.show(template,this.config);
  }

  SaveTimesheet(){
    this.common.ShowSpinner();
    this.service.AddTimesheet({"timesheetList":[this.timesheetDetail]}).subscribe(result=>{
      console.log("Success add timesheet")
      //console.log(result);
      this.modalRef.hide();
      this.common.showToast('Timesheet update successfully','Sucess','success');
      this.common.HideSpinner();
      //console.log(result)
    },error=>{
      console.log(error)
      this.common.HideSpinner();
    })
  }
}
