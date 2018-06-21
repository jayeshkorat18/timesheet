import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import * as S3 from 'aws-sdk/clients/s3'

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
  selectedFiles: FileList;

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
    this.getS3Detail();
  }

  ngOnInit() {
  }

  //File upload start
  getS3Detail() {
    this.service.GetS3Detail().subscribe((result) => {
      if (result.status == 1) {
        let decrypt = atob(result.data);
        var array = decrypt.split(':');
        this.accessKeyId = array[0].trim();
        this.secretAccessKey = array[1].trim();
      }
    }, (error) => {
      console.log(error);
    })
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  //Timesheet start
  testsubmit(timesheet) {
    console.log(timesheet.value);
    if (Boolean(this.selectedFiles)) {
      const file = this.selectedFiles.item(0);
      const bucket = new S3(
        {
          accessKeyId: this.accessKeyId,
          secretAccessKey: this.secretAccessKey,
          region: 'us-east-2'
        }
      );
      const params = {
        Bucket: 'timesheets.tekreliance.com',
        Key: this.FOLDER + Date.now()+'_'+file.name,
        Body: file
      };
      let self = this;
      self.common.ShowSpinner();
      bucket.upload(params, function (err, data) {

        if (err) {
          console.log('There was an error uploading your file: ', err);
          self.common.showToast('There was an error uploading your file', 'Error', 'error');
          self.common.HideSpinner();
          return false;
        } else {
          console.log('Successfully uploaded file.', data);
          var days = [];
          var day = self.startOfWeek;
          var requestData = [];
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
            if ((rhours != 0 || ohours != 0) && date <= moment().format('MM/DD/YYYY')) {
              requestData.push({
                status: 1,
                status_updatedby_id: self.userDetail.user.id,
                date: date,
                regular_hours: rhours,
                overtime_hours: ohours,
                timesheet_image_name: data.Location,
                client_id: 1,
                account_id: self.userDetail.user.id,
                notes: timesheet.value.notes
              })
            }

            day = day.clone().add(1, 'd');
          }

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

          return true;
        }
      });
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
      this.endOfWeek = moment(this.endOfWeek).add(1, 'weeks').endOf('isoWeek')
    }
  }
  previousWeek() {
    this.startOfWeek = moment(this.startOfWeek).subtract(1, 'weeks').startOf('isoWeek');
    this.endOfWeek = moment(this.endOfWeek).subtract(1, 'weeks').endOf('isoWeek')
  }
  //Timesheet End
}
