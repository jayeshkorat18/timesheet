import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule} from '../../shared.module';
import { ClientComponent } from './client.component';
import { AddClientComponent } from './add-client/add-client.component';

export const routes = [
  { path: '', component: ClientComponent, pathMatch: 'full' },
  { path: 'add-client', component: AddClientComponent,data:{title:'Add Client'}},
  { path: 'edit-client', component: AddClientComponent, data:{title:'Edit Client'}}
];
 

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    UiSwitchModule,
    SharedModule
  ],
  declarations: [ClientComponent, AddClientComponent]
}) 
export class ClientModule { }
