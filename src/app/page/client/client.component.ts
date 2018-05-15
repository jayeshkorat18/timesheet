import { Component, OnInit,Input,EventEmitter, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { CommonService } from '../../shared/service/common.service';
import { WebserviceService } from '../../shared/service/webservice.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-md'
  };
  closeResult: string;
  dtOptions: DataTables.Settings = {};
  clients: any = [];
  dtTrigger: Subject<any> = new Subject();
  detail:any;
  account_id:number;

  constructor(public router: Router,private modalService: BsModalService, public common: CommonService, public service: WebserviceService) {

   }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      columnDefs: [
        { "orderable": false, "targets":  [ -1,0,1,2,3 ] },
        { "orderable":false,"targets":'nosort'}
      ]
    };
    this.GetClientList();
  }
  //Get List of accountant
  GetClientList() {
    this.common.ShowSpinner();
    this.service.GetClientList().subscribe(result => {
      console.log(result);
      this.clients = result;
      this.dtTrigger.next();
      this.common.HideSpinner();
    }, error => {
      console.log(error);
      this.common.HideSpinner();
    })
  }
  gotoEdit(data){
    this.router.navigate(['/page/client/edit-client',{clientData:JSON.stringify(data)}]);
  }
  
}
