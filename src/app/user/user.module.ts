import { NgModule } from '@angular/core';
import { SharedModule } from '../@shared/shared.module';
import { UserRoutingModule } from './user-routing.module';

import { UserComponent } from './user.component';
import { CricketComponent } from './cricket/cricket.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RightPanelComponent } from './dashboard/right-panel/right-panel.component';
import { CricketRightPanelComponent } from './cricket/cricket-right-panel/cricket-right-panel.component';


@NgModule({
  declarations: [
    UserComponent,
    DashboardComponent,
    RightPanelComponent,
    CricketComponent,
    CricketRightPanelComponent
  ],
  imports: [
    SharedModule,    
    UserRoutingModule
  ]
})
export class UserModule { }
