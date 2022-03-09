import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CasinoComponent } from './casino/casino.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HorseBettingComponent } from './horse-betting/horse-betting.component';
import { MatchComponent } from './match/match.component';
import { PromotionComponent } from './promotion/promotion.component';
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
      { path: 'match', redirectTo: 'match/all', pathMatch: 'full' },
      {
        path: 'match/:tab',
        component: MatchComponent
      },
      { path: 'casino', redirectTo: 'casino/all', pathMatch: 'full' },
      {
        path: 'casino/:tab',
        component: CasinoComponent
      },
      { path: 'horse-betting', redirectTo: 'horse-betting/all', pathMatch: 'full' },
      {
        path: 'horse-betting/:tab',
        component: HorseBettingComponent
      },
      { path: 'promotion', redirectTo: 'promotion/all', pathMatch: 'full' },
      {
        path: 'promotion/:tab',
        component: PromotionComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
