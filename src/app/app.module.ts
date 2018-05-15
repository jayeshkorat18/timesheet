import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CommonService} from './shared/service/common.service';
import { BsModalService  } from 'ngx-bootstrap';

import { AuthGuard } from './shared/helper/auth.guard';
import { WebserviceHandlerService } from './shared/service/webservice-handler.service';
import { WebserviceService } from './shared/service/webservice.service';
import { SpinnerService } from './shared/helper/spinner/spinner.service';
import { SpinnerComponent } from './shared/helper/spinner/spinner.component';
import { UserDetailFormDirective } from './shared/directive/user-detail-form.directive';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    UserDetailFormDirective
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [CommonService,AuthGuard,WebserviceHandlerService,WebserviceService,SpinnerService,BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
