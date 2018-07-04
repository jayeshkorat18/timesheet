import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import * as _ from 'lodash';

import { CommonService } from '../../../shared/service/common.service';
import { WebserviceService } from '../../../shared/service/webservice.service';

@Component({
  selector: 'app-add-timesheet',
  templateUrl: './add-timesheet.component.html',
  styleUrls: ['./add-timesheet.component.scss']
})
export class AddTimesheetComponent implements OnInit {
  userDetail: any;
  @ViewChild('template') tamplate: TemplateRef<any>
  timesheet: FormGroup;
  timesheetData: any;
  startOfWeek = moment().startOf('isoWeek');
  endOfWeek = moment().endOf('isoWeek');
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-md'
  };
  resultData: any;
  accessKeyId: any;
  secretAccessKey: any;
  FOLDER = 'timesheets.angularjs/';
  //selectedFiles: FileList;
  isDisable: any = {};
  fileToUpload: File = null;


  constructor(private router: Router, public formBuilder: FormBuilder, private modalService: BsModalService, public common: CommonService, public service: WebserviceService) {
    this.userDetail = JSON.parse(localStorage.getItem('UserData'))
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
      notes: ['']
    })
    
    this.getTimesheetData();
  }

  ngOnInit() {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  uploadFileToActivity() {
    console.log(this.fileToUpload.name);

    // this.service.UploadTimesheetDocument(this.fileToUpload).subscribe(data => {
    //   console.log(JSON.stringify(data));
    //   console.log(data.result.files.fle[0].name);
    //   // do something, if upload success
    // }, error => {
    //   console.log(error);
    // });
  }

  //Timesheet start
  timesheetDataSubmit(timesheet) {
    console.log(timesheet.value);
    if (Boolean(this.fileToUpload)) {
      let extention = this.fileToUpload.name.split('.').pop();
      if (extention == 'jpg' || extention == 'png' || extention == 'pdf') {
        let self = this;
        self.common.ShowSpinner();
        var days = [];
        var day = self.startOfWeek;
        var requestData = [];
        let filename=self.userDetail.user.id;
        while (day <= self.endOfWeek) {
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
          
          let currentData = _.find(self.timesheetData, function (o) { return moment(o.date).format('MM/DD/YYYY') == moment(day.toDate()).format('MM/DD/YYYY') });
          let isApproved = false;
          //console.log(currentData);
          if (Boolean(currentData)) {
            isApproved = currentData.status == 1 ? false : true;
          }
          if ((rhours != 0 || ohours != 0) && date <= moment().format('MM/DD/YYYY') && !isApproved) {
            requestData.push({
              status: 1,
              status_updatedby_id: self.userDetail.user.id,
              date: date,
              regular_hours: rhours,
              overtime_hours: ohours,
              timesheet_image_name: '',//data.result.files.file[0].name,
              client_id: 1,
              account_id: self.userDetail.user.id,
              notes: timesheet.value.notes
            })
            filename+='_'+moment(day.toDate()).format('MMDDYY');
          }

          day = day.clone().add(1, 'd');
        }
        filename+='.'+extention;
        
        this.service.UploadTimesheetDocument(this.fileToUpload, filename).subscribe(data => {
          if (data.result.files.file[0].name) {
            console.log('Successfully uploaded file.', data);

            for(let i=0;i<requestData.length;i++){requestData[i].timesheet_image_name=data.result.files.file[0].name}
            console.log(requestData);
            self.service.AddTimesheet({ "timesheetList": requestData }).subscribe(result => {
              console.log("Success add timesheet")

              self.resultData = result
              self.openModal(self.tamplate)
              //self.common.showToast('msg','Sucess','success');
              self.router.navigate(['page/timesheet']);
              self.common.HideSpinner();
              console.log(result)
            }, error => {
              console.log(error)
              self.common.HideSpinner();
            })
          } else {
            console.log('There was an error uploading your file: ');
            self.common.showToast('There was an error uploading your file', 'Error', 'error');
            self.common.HideSpinner();
          }
        });
      } else {
        this.common.showToast('Allow only .jpg, .png, .pdf document format', 'Invalid format', 'error');
      }
    } else {
      this.common.showToast('Please select document', 'Validation', 'error');
    }
  }

  validateValue(day) {
    switch (day) {
      case 'mon':
        if (this.timesheet.value.mon == 9)
          this.timesheet.patchValue({ mon: '' })
        break;
      case 'tue':
        if (this.timesheet.value.tue == 9)
          this.timesheet.patchValue({ tue: '' })
        break;
      case 'wed':
        if (this.timesheet.value.wed == 9)
          this.timesheet.patchValue({ wed: '' })
        break;
      case 'thu':
        if (this.timesheet.value.thu == 9)
          this.timesheet.patchValue({ thu: '' })
        break;
      case 'fri':
        if (this.timesheet.value.fri == 9)
          this.timesheet.patchValue({ fri: '' })
        break;
      case 'sat':
        if (this.timesheet.value.sat == 9)
          this.timesheet.patchValue({ sat: '' })
        break;
      case 'sun':
        if (this.timesheet.value.sun == 9)
          this.timesheet.patchValue({ sun: '' })
        break;
      case 'mono':
        if (this.timesheet.value.mono == 9)
          this.timesheet.patchValue({ mono: '' })
        break;
      case 'tueo':
        if (this.timesheet.value.tueo == 9)
          this.timesheet.patchValue({ tueo: '' })
        break;
      case 'wedo':
        if (this.timesheet.value.wedo == 9)
          this.timesheet.patchValue({ wedo: '' })
        break;
      case 'thuo':
        if (this.timesheet.value.thuo == 9)
          this.timesheet.patchValue({ thuo: '' })
        break;
      case 'frio':
        if (this.timesheet.value.frio == 9)
          this.timesheet.patchValue({ frio: '' })
        break;
      case 'sato':
        if (this.timesheet.value.sato == 9)
          this.timesheet.patchValue({ sato: '' })
        break;
      case 'suno':
        if (this.timesheet.value.suno == 9)
          this.timesheet.patchValue({ suno: '' })
        break;
      default:
        break;
    }
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }
  decline(): void {
    this.modalRef.hide();
  }
  nextWeek() {
    if (this.startOfWeek < moment().startOf('isoWeek')) {
      this.startOfWeek = moment(this.startOfWeek).add(1, 'weeks').startOf('isoWeek');
      this.endOfWeek = moment(this.endOfWeek).add(1, 'weeks').endOf('isoWeek');
      this.getTimesheetData();
    }
  }
  previousWeek() {
    this.startOfWeek = moment(this.startOfWeek).subtract(1, 'weeks').startOf('isoWeek');
    this.endOfWeek = moment(this.endOfWeek).subtract(1, 'weeks').endOf('isoWeek');
    this.getTimesheetData()
  }

  //Get TImesheet data for check approved timesheet and display hours
  getTimesheetData() {
    let requestData = {
      accountId: this.userDetail.user.id,
      startDate: this.startOfWeek,
      endDate: this.endOfWeek,
    }
    this.common.ShowSpinner();
    this.service.GetTimesheetDetail(requestData).subscribe((result) => {
      this.common.HideSpinner();
      if (result.status == 1) {
        this.timesheetData = result.data;
        let self = this;
        //var day = self.startOfWeek;
        var days = [];
        var day = self.startOfWeek;
        //console.log(self.startOfWeek)
        //console.log(self.endOfWeek)
        while (day <= self.endOfWeek) {
          //let m = moment(day.toDate()).utcOffset(0);
          //m.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
          //console.log(this.timesheetData);
          //console.log( moment(day.toDate()).format('MM/DD/YYYY'));
          switch (day.days()) {
            case 1:
              let mon = _.find(this.timesheetData, function (o) { return moment(o.date).format('MM/DD/YYYY') == moment(day.toDate()).format('MM/DD/YYYY') });
              console.log(mon);
              if (Boolean(mon)) {
                this.timesheet.patchValue({ mon: mon.regular_hours })
                this.timesheet.patchValue({ mono: mon.overtime_hours })
                this.isDisable.mon = mon.status;
              } else {
                this.timesheet.patchValue({ mon: '' })
                this.timesheet.patchValue({ mono: '' })
                this.isDisable.mon = 1;
              }
              break;
            case 2:
              let tue = _.find(this.timesheetData, function (o) { return moment(o.date).format('MM/DD/YYYY') == moment(day.toDate()).format('MM/DD/YYYY') });
              if (Boolean(tue)) {
                this.timesheet.patchValue({ tue: tue.regular_hours })
                this.timesheet.patchValue({ tueo: tue.overtime_hours })
                this.isDisable.tue = tue.status;
              } else {
                this.timesheet.patchValue({ tue: '' })
                this.timesheet.patchValue({ tueo: '' })
                this.isDisable.tue = 1;
              }
              break;
            case 3:
              let wed = _.find(this.timesheetData, function (o) { return moment(o.date).format('MM/DD/YYYY') == moment(day.toDate()).format('MM/DD/YYYY') });
              if (Boolean(wed)) {
                this.timesheet.patchValue({ wed: wed.regular_hours })
                this.timesheet.patchValue({ wedo: wed.overtime_hours })
                this.isDisable.wed = wed.status;
              } else {
                this.timesheet.patchValue({ wed: '' })
                this.timesheet.patchValue({ wedo: '' })
                this.isDisable.wed = 1;
              }
              break;
            case 4:
              let thu = _.find(this.timesheetData, function (o) { return moment(o.date).format('MM/DD/YYYY') == moment(day.toDate()).format('MM/DD/YYYY') });
              if (Boolean(thu)) {
                this.timesheet.patchValue({ thu: thu.regular_hours })
                this.timesheet.patchValue({ thuo: thu.overtime_hours })
                this.isDisable.thu = thu.status;
              } else {
                this.timesheet.patchValue({ thu: '' })
                this.timesheet.patchValue({ thuo: '' })
                this.isDisable.thu = 1;
              }
              break;
            case 5:
              let fri = _.find(this.timesheetData, function (o) { return moment(o.date).format('MM/DD/YYYY') == moment(day.toDate()).format('MM/DD/YYYY') });
              if (Boolean(fri)) {
                this.timesheet.patchValue({ fri: fri.regular_hours })
                this.timesheet.patchValue({ frio: fri.overtime_hours })
                this.isDisable.fri = fri.status;
              } else {
                this.timesheet.patchValue({ fri: '' })
                this.timesheet.patchValue({ frio: '' })
                this.isDisable.fri = 1;
              }
              break;
            case 6:
              let sat = _.find(this.timesheetData, function (o) { return moment(o.date).format('MM/DD/YYYY') == moment(day.toDate()).format('MM/DD/YYYY') });
              if (Boolean(sat)) {
                this.timesheet.patchValue({ sat: sat.regular_hours })
                this.timesheet.patchValue({ sato: sat.overtime_hours })
                this.isDisable.sat = sat.status;
              } else {
                this.timesheet.patchValue({ sat: '' })
                this.timesheet.patchValue({ sato: '' })
                this.isDisable.sat = 1;
              }
              break;
            case 0:
              let sun = _.find(this.timesheetData, function (o) { return moment(o.date).format('MM/DD/YYYY') == moment(day.toDate()).format('MM/DD/YYYY') });
              if (Boolean(sun)) {
                this.timesheet.patchValue({ sun: sun.regular_hours })
                this.timesheet.patchValue({ suno: sun.overtime_hours })
                this.isDisable.sun = sun.status;
              } else {
                this.timesheet.patchValue({ sun: '' })
                this.timesheet.patchValue({ suno: '' })
                this.isDisable.sun = 1;
              }
              break;
            default:
              break;
          }
          day = day.clone().add(1, 'd');
        }
      }
      console.log(result);
    }, (error) => {
      console.log(error);
    })
  }
  //Timesheet End
}
