import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CommonService } from '../../shared/service/common.service';
import { WebserviceService } from '../../shared/service/webservice.service'

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.scss']
})
export class UserdetailComponent implements OnInit {
  @Input() accountid:any;
  public userdetail: FormGroup;
  public detail:any;
  public submitAttempt: boolean;
  @Output() onCloseBack: EventEmitter<any> = new EventEmitter();

  constructor(public router: Router, public activatedRoute: ActivatedRoute, private fb: FormBuilder, public service: WebserviceService, public common: CommonService) { 

    this.userdetail = fb.group({
      phone: [''],
      emergency_phone: [''],
      dob: [''],
      address_street: [''],
      address_street_2: [''],
      address_city: [''],
      address_state: [''],
      address_country: ['']
    });
  }

  ngOnInit() {
    console.log("account_id:"+this.accountid);
    this.GetUserDetailById();
  }
  closeModal(){
    this.onCloseBack.next();
  }
  GetUserDetailById(){
    this.common.ShowSpinner();
    this.service.GetUserDetailById(this.accountid).subscribe(result=>{
      console.log("GetUserDetailById")
      console.log(result)
      this.detail=result;
      if(result.length>0){
        this.userdetail.patchValue(result[0]);
      }
      console.log(this.userdetail)
      this.common.HideSpinner();
    },error=>{
      console.log(error);
      this.common.HideSpinner();
    })
  }

  AddUserdetail(){
    this.closeModal();
    this.userdetail.value.account_id=this.accountid;
    this.common.ShowSpinner();
    if(this.detail.length>0){
      this.userdetail.value.id=this.detail[0].id;
      this.service.UpdateUserDetail(this.detail[0].id,this.userdetail.value).subscribe(result=>{
        //console.log(result)
        this.closeModal();
        this.common.HideSpinner();
      },error=>{
        console.log(error);
        this.common.HideSpinner();
      })
    }else{
      this.service.AddUserdetail(this.userdetail.value).subscribe(result=>{
        //console.log(result)
        this.common.HideSpinner();
        this.closeModal();
      },error=>{
        this.common.HideSpinner();
        console.log(error);
      })
    }
  }
}
