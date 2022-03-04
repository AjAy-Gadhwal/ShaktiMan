import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { SharedModule } from '../@shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { TasksComponent } from './tasks/tasks.component';
import { UsersComponent } from './users/users.component';
import { UserDetailModalComponent } from './users/user-detail-modal/user-detail-modal.component';
import { PaymentModalComponent } from './users/payment-modal/payment-modal.component';
import { PaymentsComponent } from './payments/payments.component';
import { ShopsComponent } from './shops/shops.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { TaskDetailModalComponent } from './tasks/task-detail-modal/task-detail-modal.component';

@NgModule({
  declarations: [
    AdminComponent,
    TasksComponent,
    UsersComponent,    
    PaymentsComponent,
    ShopsComponent,
    UserDetailModalComponent,
    PaymentModalComponent,
    TaskDetailModalComponent 
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    NgxQRCodeModule 
  ]
})
export class AdminModule { }
