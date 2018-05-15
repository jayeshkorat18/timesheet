import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CommonService } from './../../../shared/service/common.service';
import { WebserviceService } from './../../../shared/service/webservice.service';

@Component({
  selector: 'app-add-accountant',
  templateUrl: './add-accountant.component.html',
  styleUrls: ['./add-accountant.component.scss']
})
export class AddAccountantComponent implements OnInit {
  mode: string;
  public accountant: FormGroup;
  public submitAttempt: boolean;
  userid: number = 0;
  public resetpassword: FormGroup;
  public accountantDetails:any;
  public paramData:any;

  constructor(public router: Router, public activatedRoute: ActivatedRoute, private fb: FormBuilder, public service: WebserviceService, public common: CommonService) {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      if (Boolean(params.email)) {
        this.mode = 'Edit Accountant';
        this.paramData=params;
       // this.AccountantDetail(params.id);
       // this.userid = params.id;
      } else {
        this.mode = 'Add Accountant';
      }

      //console.log(this.activatedRoute.snapshot.params)

    })

    this.accountant = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      passwordConfirm: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      status: [true]
    }, {
      validator: this.common.Match('password', 'passwordConfirm')
    });
    
    this.resetpassword = fb.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      passwordConfirm: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    }, {
      validator: this.common.Match('password', 'passwordConfirm')
    });
  }
  
  ngOnInit() {
  }

  //Get Accountant detail
  AccountantDetail(id) {
    this.common.ShowSpinner();
    this.service.AccountantDetail(id).subscribe(result => {
      //console.log(result);
      this.accountantDetails=result;
      this.accountant.patchValue({ email: result.email, username: result.username, status: result.status })
      this.common.HideSpinner();
    }, error => {
      console.log(error);
      this.common.HideSpinner();
    })
  }

  //Add accountant
  addAccountant() {
    this.submitAttempt = true;
    console.log(this.accountant);
    if (this.accountant.valid) {
      let param = this.accountant.value;
      param.myrole_id = 1;
      console.log(param)

      if (this.userid == 0) {
        this.common.ShowSpinner();
        this.service.AddAccountant(param).subscribe(result => {
          //console.log(result);
          this.router.navigate(['page/accountant']);
          this.common.showToast('Accountant Added Successfully', 'Success', 'success')
          this.common.HideSpinner();
        }, error => {
          console.log(error);
          this.common.showToast('Error in add accountant', 'Error', 'error')
          this.common.HideSpinner();
        })
      } else {
        this.common.ShowSpinner();
        this.service.EditAccountant(this.userid, param).subscribe(result => {
          //console.log(result);
          this.router.navigate(['page/accountant']);
          this.common.showToast('Accountant Save Successfully', 'Success', 'success')
          this.common.HideSpinner();
        }, error => {
          console.log(error);
          this.common.showToast('Error in save accountant', 'Error', 'error')
          this.common.HideSpinner();
        })
      }
    }
  }

  ChangePassword(){
    this.submitAttempt = true;
    if (this.resetpassword.valid) {
      //this.accountantDetails.email
      this.common.ShowSpinner();
      this.service.ResetPassword({emailVerify:this.paramData.email,newPassword:this.resetpassword.value.password}).subscribe(result=>{
        //console.log(result)
        this.router.navigate(['page/accountant']);
          this.common.showToast('Password reset successfully', 'Success', 'success')
          this.common.HideSpinner();
      },error=>{
        console.log(error);
        this.common.showToast('Error in password reset', 'Error', 'error')
        this.common.HideSpinner();
      })
    } 
  }
}