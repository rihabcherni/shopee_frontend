import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { VisitorRoutingModule } from './modules/visitor/visitor-routing.module';
import { AdminRoutingModule } from './modules/admin/admin-routing.module';
import { ClientRoutingModule } from './modules/client/client-routing.module';
import { SellerRoutingModule } from './modules/seller/seller-routing.module';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full'},
  { path: '**', redirectTo: '' },
  { path: '', loadChildren: () => import('./modules/visitor/visitor.module').then(m => m.VisitorModule) },
  { path: 'seller', loadChildren: () => import('./modules/seller/seller.module').then(m => m.SellerModule) },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  { path: 'client', loadChildren: () => import('./modules/client/client.module').then(m => m.ClientModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    VisitorRoutingModule,
    ClientRoutingModule,
    AdminRoutingModule,
    SellerRoutingModule
  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }
