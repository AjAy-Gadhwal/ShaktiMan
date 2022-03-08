import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CricketComponent } from './cricket/cricket.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user.component';

const routes: Routes = [  
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: '/:tab',
        component: DashboardComponent
      },
      {
        path: 'dashboard/:tab',
        component: DashboardComponent
      },
      { path: 'cricket', redirectTo: 'cricket/all', pathMatch: 'full' },
      {
        path: 'cricket',
        component: CricketComponent
      },
      {
        path: 'cricket/:tab',
        component: CricketComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
