import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password.component';

export const routes = [
  { path: '', component: ForgotPasswordComponent, pathMatch: 'full' }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ForgotPasswordComponent]
})
export class ForgotPasswordModule { }
