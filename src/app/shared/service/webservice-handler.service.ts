import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WebserviceHandlerService {
  
  constructor(private http: Http) { }

  Post(URL, Parameter) {
    let access_token = localStorage.getItem('access_token');
    var headers = new Headers({  });
    var Option = new RequestOptions({ headers: headers });
    let token=((URL.indexOf('?') != -1)?'&access_token=':'?access_token=')+access_token;
    return this.http.post(URL+token, Parameter, Option).map(data => {
      return data.json();
    }, error => {
      return error;
    });
  }
  PostFormData(URL, Parameter) {
    console.log(Parameter);
    let access_token = localStorage.getItem('access_token');
    let headers = new Headers({"Content-Type": "application/x-www-form-urlencoded","Accept": "application/json"});
    var Option = new RequestOptions({ headers: headers });
    let token=((URL.indexOf('?') != -1)?'&access_token=':'?access_token=')+access_token;
    return this.http.post(URL+token, Parameter, Option).map(data => {
      return data.json();
    }, error => {
      return error;
    });
  }
  Put(URL, Parameter) {
    let access_token = localStorage.getItem('access_token');
    var headers = new Headers({  });
    var Option = new RequestOptions({ headers: headers });
    let token=((URL.indexOf('?') != -1)?'&access_token=':'?access_token=')+access_token;
    return this.http.put(URL+token, Parameter, Option).map(data => {
      return data.json();
    }, error => {
      return error;
    });
  }

  Patch(URL, Parameter) {
    let access_token = localStorage.getItem('access_token');
    var headers = new Headers({  });
    var Option = new RequestOptions({ headers: headers });
    let token=((URL.indexOf('?') != -1)?'&access_token=':'?access_token=')+access_token;
    return this.http.patch(URL+token, Parameter, Option).map(data => {
      return data.json();
    }, error => {
      return error;
    });
  }

  Get(URL) {
    //console.log( 'Token=>' + Token);
    let access_token = localStorage.getItem('access_token');
    var headers = new Headers({});
    var Option = new RequestOptions({ headers: headers });
    let token=((URL.indexOf('?') != -1)?'&access_token=':'?access_token=')+access_token;
    return this.http.get(URL+token, Option).map(data => {
      return data;
    }, error => {
      return error;
    });

  }
}
