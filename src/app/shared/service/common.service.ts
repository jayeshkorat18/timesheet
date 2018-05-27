import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl } from '@angular/forms';

import { SpinnerService } from '../../shared/helper/spinner/spinner.service';

@Injectable()
export class CommonService {
  constructor(public toastr: ToastrService,public spinnerService:SpinnerService) { }

  //Show loading spinner
  ShowSpinner(){
    this.spinnerService.show();
  }

  HideSpinner(){
    this.spinnerService.hide();
  }

  //Show Toster message
  showToast(message,title, type) {
    switch (type) {
      case 'success':
        this.toastr.success(message,title);
        break;
      case 'info':
        this.toastr.info( message,title);
        break;
      case 'warning':
        this.toastr.warning(message,title);
        break;
      case 'error':
        this.toastr.error(message,title);
        break;
      default:
        break;
    }
  }

  /**
   * Match two controls if they are the same
   * @param firstControlName
   * @param secondControlName
   * @returns {(AC: AbstractControl) => any}
   * @constructor
   */
  Match(firstControlName, secondControlName) {
    return (AC: AbstractControl) => {
      let firstControlValue = AC.get(firstControlName).value; // to get value in input tag
      let secondControlValue = AC.get(secondControlName).value; // to get value in input tag
      if (firstControlValue != secondControlValue) {
        AC.get(secondControlName).setErrors({MatchFields: true});
        //console.log(false);
      } else {
        //console.log(true);
        return null
      }
    };
  }

  //Get date formate
  formatDate(date) {
    var day = date.getDate()>9?date.getDate()-1:'0'+(date.getDate()-1);
    var monthIndex = date.getMonth()>8? (parseInt(date.getMonth())+1) : '0'+ (parseInt(date.getMonth())+1);
    var year = date.getFullYear();
  
    return monthIndex + '/' + day + '/' + year;
  }
}
