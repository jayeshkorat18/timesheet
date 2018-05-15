import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, RouterState } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
        private _currentRoute: ActivatedRoute) {
    }

    canActivate(route: ActivatedRouteSnapshot) {

        if (this.loggedIn()) {
            //this.router.navigate(['page/dashboard']);
            return true;
        }

        localStorage.clear();
        this.router.navigate(['login']);
        return false;
    }

    public loggedIn() {
        return Boolean(localStorage.getItem('access_token'));
    }
}