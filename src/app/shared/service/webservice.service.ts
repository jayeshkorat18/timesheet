import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { WebserviceHandlerService } from './webservice-handler.service';

@Injectable()
export class WebserviceService {

  public BASE_URL: string = 'https://api-timesheets.herokuapp.com/api/';
  constructor(private http: Http, public webservicehandler: WebserviceHandlerService) { }

  //Login User
  Login(parameter) {
    var URL = this.BASE_URL + 'account/login?include=user';
    return this.http.post(URL, parameter).map(data => {
      if (data.json().user.status) {
        //alert(data.json().id);
        localStorage.setItem("UserData", JSON.stringify(data.json()));
        localStorage.setItem("access_token", data.json().id);
        return data.json();
      } else {
        return { status: false }
      }
    }, error => {
      return error;
    });
  }

  Logout() {
    var URL = this.BASE_URL + 'account/logout';
    return this.webservicehandler.Post(URL, {}).map(data => {
      return data;
    }, error => {
      return error;
    });
  }

  //List of accountant
  AccountantList(myrole_id) {
    var URL = this.BASE_URL + 'account?filter={"where":{"myrole_id":"' + myrole_id + '"}}';
    return this.webservicehandler.Get(URL).map(data => {
      return data.json();
    }, error => {
      return error;
    });
  }

  //List of candidate
  getCandidateList() {
    var URL = this.BASE_URL + 'account/getCandidateList';
    return this.webservicehandler.Get(URL).map(data => {
      return data.json();
    }, error => {
      return error;
    });
  }

  //Add accountant detail
  AddAccountant(Parameter) {
    var URL = this.BASE_URL + 'account';
    return this.webservicehandler.Post(URL, Parameter).map(data => {
      return data;
    }, error => {
      return error;
    });
  }

  //Edit accountant detail
  EditAccountant(id, Parameter) {
    var URL = this.BASE_URL + 'account/' + id;
    return this.webservicehandler.Patch(URL, Parameter).map(data => {
      return data;
    }, error => {
      return error;
    });
  }

  AccountantDetail(id) {
    var URL = this.BASE_URL + 'account/' + id;
    return this.webservicehandler.Get(URL).map(data => {
      return data.json();
    }, error => {
      return error;
    });
  }

  //List of accountant
  ChangeStatus(Parameter) {
    var URL = this.BASE_URL + 'account/updateAccess';
    return this.webservicehandler.Post(URL, Parameter).map(data => {
      return data
    }, error => {
      return error;
    });
  }

  ResetPassword(Parameter) {
    var URL = this.BASE_URL + 'account/changePassword';
    return this.webservicehandler.Post(URL, Parameter).map(data => {
      return data;
    }, error => {
      return error;
    });
  }

  //-------------------------------------User detail-----------------------------------------//

  //Get user detail by account_id
  GetUserDetailById(account_id) {
    var URL = this.BASE_URL + 'userDetails?filter={"where":{"account_id":"' + account_id + '"}}';
    return this.webservicehandler.Get(URL).map(data => {
      return data.json();
    }, error => {
      return error;
    });
  }


  //Add User detail by account_id
  AddUserdetail(Parameter) {
    var URL = this.BASE_URL + 'userDetails';
    return this.webservicehandler.Post(URL, Parameter).map(data => {
      return data;
    }, error => {
      return error;
    });
  }

  //Update user detail
  UpdateUserDetail(id, Parameter) {
    var URL = this.BASE_URL + 'userdetails/updateUserDetails';
    return this.webservicehandler.Post(URL, Parameter).map(data => {
      return data;
    }, error => {
      return error;
    });
  }
  //---------------------------------Client service-----------------------------------------------//

  //Add client detail
  AddClient(Parameter) {
    var URL = this.BASE_URL + 'account/addClient';
    return this.webservicehandler.Post(URL, Parameter).map(data => {
      return data;
    }, error => {
      return error;
    });
  }
  EditClient(id, parameter) {
    var URL = this.BASE_URL + 'client/' + id;
    return this.webservicehandler.Patch(URL, parameter).map(data => {
      return data;
    }, error => {
      return error;
    });
  }
  //Get client list
  GetClientList() {
    var URL = this.BASE_URL + '/client/getClientList';
    return this.webservicehandler.Get(URL).map(data => {
      return data.json();
    }, error => {
      return error;
    });
  }

  //Start project
  StartProject(Parameter) {
    var URL = this.BASE_URL + 'project/startProject';
    return this.webservicehandler.Post(URL, Parameter).map(data => {
      return data;
    }, error => {
      return error;
    });
  }
  //Start project
  EndProject(Parameter) {
    var URL = this.BASE_URL + 'project/updateProject';
    return this.webservicehandler.Post(URL, Parameter).map(data => {
      return data;
    }, error => {
      return error;
    });
  }
  //Get client detail by candidate id
  GetClientDetailByCandidate(candidateId) {
    var URL = this.BASE_URL + '/account/getCandidateClient?candidateId='+candidateId;
    return this.webservicehandler.Get(URL).map(data => {
      return data.json();
    }, error => {
      return error;
    });
  }

  //---------------------------------Timesheet service-----------------------------------------------//
  //Get Timesheet list
  TimesheetListById(account_id) {
    var URL = this.BASE_URL + 'timesheets/getTimesheetList?account_id=' + account_id;
    return this.webservicehandler.Get(URL).map(data => {
      return data.json();
    }, error => {
      return error;
    });
  }

  MarkAsBilled(Parameter) {
    var URL = this.BASE_URL + 'timesheets/markAsBilled';
    return this.webservicehandler.Post(URL, Parameter).map(data => {
      return data;
    }, error => {
      return error;
    });
  }

  MarkAsPaid(Parameter) {
    var URL = this.BASE_URL + 'timesheets/markAsPaidByClient';
    return this.webservicehandler.Post(URL, Parameter).map(data => {
      return data;
    }, error => {
      return error;
    });
  }
  ChangeTimesheetStatus(Parameter) {
    var URL = this.BASE_URL + 'timesheets/updateStatus';
    return this.webservicehandler.Post(URL, Parameter).map(data => {
      return data;
    }, error => {
      return error;
    });
  }

  //Add timesheet
  AddTimesheet(Parameter) {
    var URL = this.BASE_URL + 'timesheets/saveTimesheets';
    return this.webservicehandler.Post(URL, Parameter).map(data => {
      return data;
    }, error => {
      return error;
    });
  }
}
