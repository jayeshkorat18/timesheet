import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CommonService } from './../../shared/service/common.service';
import { WebserviceService } from './../../shared/service/webservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: FormGroup;
  public submitAttempt: boolean;

  constructor(private fb: FormBuilder, public service: WebserviceService, public common: CommonService) {
    this.user = fb.group({
      oldpassword:['', Validators.compose([Validators.required, Validators.minLength(4)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      passwordConfirm: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    }, {
      validator: this.common.Match('password', 'passwordConfirm')
    });
   } 

  ngOnInit() {
  }

  ChangePassword(){
    this.submitAttempt = true;
    if (this.user.valid) {
      console.log(this.user.value);
    }
  }

}
