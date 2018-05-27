import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule,NgbDateParserFormatter  } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule} from '../../shared.module';
import { UserdetailComponent } from './userdetail.component';
import { NgbDateFRParserFormatter } from './../../shared/helper/ngb-date-fr-parser-formatter';
 
export const routes = [
  { path: 'userdetail', component: UserdetailComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [UserdetailComponent],
  exports:[UserdetailComponent],
  providers:[{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})
export class UserdetailModule { }
