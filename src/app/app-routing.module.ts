import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CasinoComponent } from './components/casino/casino.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HorsebettingComponent } from './components/horsebetting/horsebetting.component';
import { HorsebettingsecondComponent } from './components/horsebettingsecond/horsebettingsecond.component';
import { PromotionComponent } from './components/promotion/promotion.component';

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'casinos', component: CasinoComponent },
  { path: 'old-promotion', component: PromotionComponent },
  { path: 'horsebetting', component: HorsebettingComponent },
  { path: 'horsebetting2', component: HorsebettingsecondComponent },
  {
    path: '',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
