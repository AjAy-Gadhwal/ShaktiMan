import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { PaymentsComponent } from './payments/payments.component';
import { ShopsComponent } from './shops/shops.component';
import { TasksComponent } from './tasks/tasks.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [  
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: TasksComponent
      },
      {
        path: 'influences',
        component: UsersComponent
      },
      {
        path: 'payments',
        component: PaymentsComponent
      },
      {
        path: 'shops',
        component: ShopsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
