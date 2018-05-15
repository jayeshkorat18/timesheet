import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { PageComponent } from './page.component';
import { PageRoutingModule } from './page-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    NgbDropdownModule.forRoot(),
    PageRoutingModule
  ],
  declarations: [PageComponent, SidebarComponent, HeaderComponent],
  providers:[]
})
export class PageModule { }
