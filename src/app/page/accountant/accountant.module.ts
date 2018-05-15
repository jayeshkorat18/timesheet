import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddAccountantComponent } from './add-accountant/add-accountant.component';
import { AccountantComponent } from './accountant.component';

import { SharedModule} from '../../shared.module';
import { UserdetailModule} from '../userdetail/userdetail.module';

export const routes = [
  { path: '', component: AccountantComponent, pathMatch: 'full' },
  { path: 'add-accountant', component: AddAccountantComponent,data:{title:'Add Accounttant'}},
  { path: 'edit-accountant', component: AddAccountantComponent, data:{title:'Edit Accountant'}}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    UiSwitchModule,
    SharedModule,
    UserdetailModule
  ],
  declarations: [AddAccountantComponent, AccountantComponent]
  
})
export class AccountantModule { }
