import { Component, OnInit, Input, EventEmitter, TemplateRef } from '@angular/core';
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
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {
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
  detail: any;
  account_id: number;
  public client_id: any = '';
  public closeDetail: Function;
  public clientsList: any = [];
  public candidateDetail: any;
  public clientDetail:any={};
  constructor(public router: Router,private modalService: BsModalService, public common: CommonService, public service: WebserviceService) {

  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      columnDefs: [
        { "orderable": false, "targets": [-1, 0, 1, 2, 3] },
        { "orderable": false, "targets": 'nosort' }
      ]
    };
    this.AccountantList();
    this.GetClientList();
    this.closeDetail = this.closeModal.bind(this);
  }
  closeModal() {
    console.log("Callback");
    this.modalRef.hide();
  }
  //Get List of accountant
  AccountantList() {
    this.common.ShowSpinner();
    this.service.getCandidateList().subscribe(result => {
      //console.log(result);
      if(result.status==1){
        this.persons = result.data;
        this.dtTrigger.next();
        this.common.HideSpinner();
      }
      
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
    this.router.navigate(['/page/candidate/edit-candidate',{email:data.email,username:data.username}]);
  }
  gotoTimesheet(data){
    this.router.navigate(['/page/timesheet',{id:data.id}]);
  }
  //Open user detail model
  openUserdetail(template: TemplateRef<any>, data) {
    //this.detail=data;
    this.account_id = data.id;
    let config = {
      class: 'modal-large'
    };
    this.modalRef = this.modalService.show(template, config);
  }

  //Open confirmation dialog
  openModal(template: TemplateRef<any>, data, event) {
    this.detail = data;
    this.modalRef = this.modalService.show(template, this.config);
  }
  confirm(): void {
    let self = this;
    let tmp = [];
    _.forEach(self.persons, function (value) {
      if (value.id == self.detail.id) {
        value.status = !self.detail.status;
        self.ChangeStatus(value);
      }
      tmp.push(value)
    })

    this.persons = [];
    setTimeout(function () {
      self.persons = _.sortBy(tmp, [function (o) { return o.email; }]);
    }, 10)
    this.modalRef.hide();
  }

  decline(): void {
    let self = this;
    let tmp = this.persons;
    this.persons = [];
    setTimeout(function () {
      self.persons = _.sortBy(tmp, [function (o) { return o.email; }]);
    }, 10)
    this.modalRef.hide();
  }

  //Get List of Client
  GetClientList() {
    this.service.GetClientList().subscribe(result => {
      //console.log(result);
      this.clientsList = result;
    }, error => {
      console.log(error);
    })
  }
  //Open assign project model
  openAssignModal(template: TemplateRef<any>, data) {
    this.client_id = '';
    this.candidateDetail = data;
    this.modalRef = this.modalService.show(template, this.config);
  }
  Save(client_id) {
    if (Boolean(client_id)) {
      console.log(this.common.formatDate(new Date))
      console.log(client_id)
      this.common.ShowSpinner()
      this.service.StartProject({client_id:client_id,start_date:this.common.formatDate(new Date),account_id:this.candidateDetail.id,}).subscribe(result => {
        //console.log(result);
        this.common.showToast("Assign successfuly", "Success", "success")
        this.common.HideSpinner();
        //this.AccountantList();
      }, error => {
        console.log(error);
        this.common.HideSpinner();
        this.common.showToast("Error in assign project", "Error", "danger")
      })
      this.modalRef.hide();
    }
  }

  //Open project detail model
  openProjectDetailModal(template: TemplateRef<any>, data) {
    this.GetClientDetailByCandidate(data.id)
    this.modalRef = this.modalService.show(template, this.config);
  }

  //Get client detail by candidate id
  GetClientDetailByCandidate(id){
    this.common.ShowSpinner();
    this.service.GetClientDetailByCandidate(id).subscribe(result=>{
      console.log(result);
      if(result.status==1){
        this.clientDetail=result.data;
      }
      
      this.common.HideSpinner();
    },error=>{
      console.log(error);
      this.common.HideSpinner();
    })
  }

  UpdateProject(client_id,candidateId){
    this.common.ShowSpinner()
      this.service.EndProject({client_id:client_id,start_date:'05/22/2018',end_date:this.common.formatDate(new Date),account_id:candidateId}).subscribe(result => {
        //console.log(result);
        this.common.showToast("Update Project successfuly", "Success", "success")
        this.common.HideSpinner();
      }, error => {
        console.log(error);
        this.common.HideSpinner();
        this.common.showToast("Error in update project", "Error", "danger")
      })
      this.modalRef.hide();
  }

  Close() {
    this.modalRef.hide();
  }
}
