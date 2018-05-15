import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule} from '../../shared.module';
import { UserdetailModule} from '../userdetail/userdetail.module';
import { CandidateComponent } from './candidate.component';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';

export const routes = [
  { path: '', component: CandidateComponent, pathMatch: 'full' },
  { path: 'add-candidate', component: AddCandidateComponent,data:{title:'Add Candidate'}},
  { path: 'edit-candidate', component: AddCandidateComponent, data:{title:'Edit Candidate'}}
];
 

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    UiSwitchModule,
    UserdetailModule,
    SharedModule
  ],
  declarations: [CandidateComponent, AddCandidateComponent]
})
export class CandidateModule { }
