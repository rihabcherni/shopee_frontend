// seller-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerComponent } from './seller.component';

const routes: Routes = [
  {
    path: 'seller',
    component: SellerComponent,
    children: [
      { path: '', loadChildren: () => import('./pages/tab/tab.module').then(m => m.TabPageModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
