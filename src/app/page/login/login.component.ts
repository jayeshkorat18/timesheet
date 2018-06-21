import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../shared/service/common.service';
import { WebserviceService } from '../../shared/service/webservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public login:FormGroup;
  public submitAttempt: boolean;
  constructor(private router: Router, public common:CommonService,private fb: FormBuilder, public service:WebserviceService ) { 
    this.login = fb.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required,Validators.minLength(4)])]
    });
  }

  ngOnInit() {
   
  }
  isInvalid(controls){
    console.log(controls.valid);
    return (!controls.valid && this.submitAttempt && (controls.dirty || this.submitAttempt));
  }
  onSubmit(){
    this.submitAttempt = true;
    if (this.login.valid) {
      this.common.ShowSpinner();
      this.service.Login(this.login.value).subscribe(result=>{
        //console.log(result);
        if(Boolean(result.id)){
          this.router.navigate(['page/dashboard']);
          this.common.showToast('Login Successfully','Success','success')
        }else{
          this.common.showToast('Your account access disabled','Alert','error')
        }
        this.common.HideSpinner();
      },error=>{
        this.common.showToast(JSON.parse(error._body).error.message,'Invalid','error')
        this.common.HideSpinner();
      })
      console.log('form submitted');
    }
  }

}
