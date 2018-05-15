import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page.component';
import { AuthGuard } from './../shared/helper/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'profile', loadChildren: './profile/profile.module#ProfileModule',canActivate:[AuthGuard]},
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule',canActivate:[AuthGuard]},
      { path: 'accountant', loadChildren: './accountant/accountant.module#AccountantModule',canActivate:[AuthGuard]  },
      { path: 'candidate', loadChildren: './candidate/candidate.module#CandidateModule',canActivate:[AuthGuard]  },
      { path: 'client', loadChildren: './client/client.module#ClientModule',canActivate:[AuthGuard]  },
      //{ path: 'userdetail', loadChildren: './userdetail/userdetail.module#UserdetailModule',canActivate:[AuthGuard]  },
      { path: 'timesheet', loadChildren: './timesheet/timesheet.module#TimesheetModule',canActivate:[AuthGuard]  },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class PageRoutingModule { }
