import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  //{ path: '', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard] },
  { path: '', redirectTo: 'page', pathMatch: 'full' },
  { path: 'login', loadChildren: './page/login/login.module#LoginModule' },
  { path: 'page', loadChildren: './page/page.module#PageModule' },
  { path: 'forgot-password', loadChildren: './page/forgot-password/forgot-password.module#ForgotPasswordModule' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
