import { Component, OnInit } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3'

@Component({
  selector: 'app-timesheet-status',
  templateUrl: './timesheet-status.component.html',
  styleUrls: ['./timesheet-status.component.scss']
})
export class TimesheetStatusComponent implements OnInit {
  FOLDER = 'jsa-s3/';

  constructor() { }

  ngOnInit() {
  }
  selectedFiles: FileList;
  upload() {
    const file = this.selectedFiles.item(0);
    this.uploadfile(file);
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  uploadfile(file) {
 
    const bucket = new S3(
      {
        accessKeyId: 'AKIAJKHK7SA4SFC4ZOVA',
        secretAccessKey: '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',
        region: 'us-east-2'
      }
    );
 
    const params = {
      Bucket: 'timesheets.tekreliance.com',
      Key: this.FOLDER + file.name,
      Body: file
    };
 
    bucket.upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
 
      console.log('Successfully uploaded file.', data);
      return true;
    });
  }
}
