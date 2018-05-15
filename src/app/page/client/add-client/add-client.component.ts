import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../../shared/service/common.service';
import { WebserviceService } from '../../../shared/service/webservice.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  mode: string;
  public client: FormGroup;
  public submitAttempt: boolean;
  public clientData:any;

  constructor(public router: Router, public activatedRoute: ActivatedRoute, private fb: FormBuilder, public service: WebserviceService, public common: CommonService) {
    this.activatedRoute.params.subscribe((params: Params) => {
      //console.log(params.clientData);
      if (Boolean(params.clientData)) {
        this.mode = 'Edit Client';
        this.clientData=JSON.parse(params.clientData);
      } else {
        this.mode = 'Add Client';
      }
    })

    this.client = fb.group({
      client_name: ['', Validators.compose([Validators.required])],
      isBillable: [false],
      client_website: ['', Validators.compose([Validators.required])],
      client_address_street: ['', Validators.compose([Validators.required])],
      client_address_street_2: [''],
      client_address_city: ['',Validators.compose([Validators.required])],
      client_address_state: ['',Validators.compose([Validators.required])],
      client_address_country: ['',Validators.compose([Validators.required])]   
    });
  }
  
  ngOnInit() {
    this.client.patchValue(this.clientData)
  }

  //Add accountant
  addclient() {
    this.submitAttempt = true;
    console.log(this.client);
    if (this.client.valid) {
      let param = this.client.value;
      param.myrole_id = 2;
      console.log(param)

      if (!Boolean(this.clientData)) {
        this.common.ShowSpinner();
        this.service.AddClient(param).subscribe(result => {
          //console.log(result);
          this.router.navigate(['page/client']);
          this.common.showToast('Client Added Successfully', 'Success', 'success')
          this.common.HideSpinner();
        }, error => {
          console.log(error);
          this.common.showToast('Error in add client', 'Error', 'error')
          this.common.HideSpinner();
        })
      } else {
        this.common.ShowSpinner();
        this.service.EditClient(this.clientData.id, param).subscribe(result => {
          //console.log(result);
          this.router.navigate(['page/client']);
          this.common.showToast('Client Save Successfully', 'Success', 'success')
          this.common.HideSpinner();
        }, error => {
          console.log(error);
          this.common.showToast('Error in save Client', 'Error', 'error')
          this.common.HideSpinner();
        })
      }
    }
  }
}
