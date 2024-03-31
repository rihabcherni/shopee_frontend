import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { VisitorRoutingModule } from './visitor/visitor-routing.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { ClientRoutingModule } from './client/client-routing.module';
import { SellerRoutingModule } from './seller/seller-routing.module';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full'},
  { path: '**', redirectTo: '' }
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
