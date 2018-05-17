import { Component, OnInit,TemplateRef,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';


import { CommonService } from '../../../shared/service/common.service';
import { WebserviceService } from '../../../shared/service/webservice.service';

@Component({
  selector: 'app-add-timesheet',
  templateUrl: './add-timesheet.component.html',
  styleUrls: ['./add-timesheet.component.scss']
})
export class AddTimesheetComponent implements OnInit {
  userDetail:any;
  @ViewChild('template') tamplate:TemplateRef<any>
  timesheet: FormGroup;
  startOfWeek = moment().startOf('isoWeek');
  endOfWeek = moment().endOf('isoWeek');
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-md'
  };
  resultData:any;
   
  constructor(private router: Router,public formBuilder: FormBuilder,private modalService: BsModalService,public common: CommonService, public service: WebserviceService) {
    this.userDetail=JSON.parse(localStorage.getItem('UserData'))
    this.timesheet = formBuilder.group({
      mon: [''],
      tue: [''],
      wed: [''],
      thu: [''],
      fri: [''],
      sat: [''],
      sun: [''],
      mono: [''],
      tueo: [''],
      wedo: [''],
      thuo: [''],
      frio: [''],
      sato: [''],
      suno: [''],
    })
  }

  ngOnInit() {
  }

  //Timesheet start
  testsubmit(timesheet) {
    console.log(timesheet.value);
    var days = [];
    var day = this.startOfWeek;
    var requestData = [];
    while (day <= this.endOfWeek) {
      days.push(day.toDate());
      let rhours = 0;
      let ohours = 0;
      switch (day.days()) {
        case 1:
          rhours = timesheet.value.mon;
          ohours = timesheet.value.mono;
          break;
        case 2:
          rhours = timesheet.value.tue;
          ohours = timesheet.value.tueo;
          break;
        case 3:
          rhours = timesheet.value.wed;
          ohours = timesheet.value.wedo;
          break;
        case 4:
          rhours = timesheet.value.thu;
          ohours = timesheet.value.thuo;
          break;
        case 5:
          rhours = timesheet.value.fri;
          ohours = timesheet.value.frio;
          break;
        case 6:
          rhours = timesheet.value.sat;
          ohours = timesheet.value.sato;
          break;
        case 0:
          rhours = timesheet.value.sun;
          ohours = timesheet.value.suno;
          break;
        default:
          break;
      }
      let date = moment(day.toDate()).format('MM/DD/YYYY')
      requestData.push({
        status:1,
        status_updatedby_id:this.userDetail.user.id,
        date: date, 
        regular_hours: rhours,
        overtime_hours: ohours,
        timesheet_image_name:'image',
        client_id:1,
        account_id:this.userDetail.user.id })

      day = day.clone().add(1, 'd');
    }
    //console.log(days);
    console.log(requestData);
    this.common.ShowSpinner();
    this.service.AddTimesheet({"timesheetList":requestData}).subscribe(result=>{
      console.log("Success add timesheet")
      // let msg='';
      // result.forEach(value => {
      //   msg+=value+'';
      // });
      this.resultData=result
      this.openModal(this.tamplate)
      //this.common.showToast('msg','Sucess','success');
      this.router.navigate(['page/timesheet']);
      this.common.HideSpinner();
      console.log(result)
    },error=>{
      console.log(error)
      this.common.HideSpinner();
    })
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,this.config);
  }
  decline(): void {
    this.modalRef.hide();
  }
  nextWeek() {
    if (this.startOfWeek < moment().startOf('isoWeek')) {
      this.startOfWeek = moment(this.startOfWeek).add(1, 'weeks').startOf('isoWeek');
      this.endOfWeek = moment(this.endOfWeek).add(1, 'weeks').endOf('isoWeek')
    }
  }
  previousWeek() {
    this.startOfWeek = moment(this.startOfWeek).subtract(1, 'weeks').startOf('isoWeek');
    this.endOfWeek = moment(this.endOfWeek).subtract(1, 'weeks').endOf('isoWeek')
  }
  //Timesheet End
}
