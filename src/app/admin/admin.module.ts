import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../@shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { RightPanelComponent } from './shops/right-panel/right-panel.component';
import { ShopsComponent } from './shops/shops.component';


@NgModule({
  declarations: [
    AdminComponent,
    ShopsComponent,
    RightPanelComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
