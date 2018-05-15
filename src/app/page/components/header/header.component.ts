import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { WebserviceService } from '../../../shared/service/webservice.service';
import { CommonService } from '../../../shared/service/common.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    pushRightClass: string = 'push-right';
    UserData:any={};
    constructor(public router: Router, public common:CommonService,public service:WebserviceService) {

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
        this.UserData=JSON.parse(localStorage.getItem('UserData'));
    }

    ngOnInit() {}

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    onLoggedout() {
        this.common.ShowSpinner();
        //Logout 
        this.service.Logout().subscribe(result=>{
            localStorage.clear();
            this.router.navigate(['login']);
            this.common.HideSpinner();
        },error=>{
            console.log(error);
            this.common.HideSpinner();
        })
    }
}
