import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule} from '../../shared.module';
import { UserdetailComponent } from './userdetail.component';
 
export const routes = [
  { path: 'userdetail', component: UserdetailComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [UserdetailComponent],
  exports:[UserdetailComponent]
})
export class UserdetailModule { }
