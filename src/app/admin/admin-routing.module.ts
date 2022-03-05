import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ShopsComponent } from './shops/shops.component';

const routes: Routes = [  
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
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
