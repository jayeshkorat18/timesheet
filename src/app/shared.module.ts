import { NgModule } from '@angular/core';
import { FieldErrorDisplayModule } from './shared/helper/field-error-display/field-error-display.module';
import { ModalModule } from 'ngx-bootstrap';
//import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  exports: [
    FieldErrorDisplayModule,
    ModalModule,
    //Ng2SmartTableModule
  ],
  imports:[ModalModule.forRoot()]
})
export class SharedModule {}
