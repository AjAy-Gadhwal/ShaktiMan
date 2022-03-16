import { NgModule } from '@angular/core';
import { SharedModule } from '../@shared/shared.module';
import { UserRoutingModule } from './user-routing.module';

import { UserComponent } from './user.component';
import { MatchComponent } from './match/match.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRightPanelComponent } from './dashboard/dashboard-right-panel/dashboard-right-panel.component';
import { MatchRightPanelComponent } from './match/match-right-panel/match-right-panel.component';
import { CasinoComponent } from './casino/casino.component';
import { CasinoRightPanelComponent } from './casino/casino-right-panel/casino-right-panel.component';
import { HorseBettingComponent } from './horse-betting/horse-betting.component';
import { HorseBettingRightPanelComponent } from './horse-betting/horse-betting-right-panel/horse-betting-right-panel.component';
import { PromotionComponent } from './promotion/promotion.component';
import { PromotionRightPanelComponent } from './promotion/promotion-right-panel/promotion-right-panel.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    UserComponent,
    DashboardComponent,
    DashboardRightPanelComponent,
    MatchComponent,
    MatchRightPanelComponent,
    CasinoComponent,
    CasinoRightPanelComponent,
    HorseBettingComponent,
    HorseBettingRightPanelComponent,
    PromotionComponent,
    PromotionRightPanelComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    SharedModule,    
    UserRoutingModule
  ]
})
export class UserModule { }
