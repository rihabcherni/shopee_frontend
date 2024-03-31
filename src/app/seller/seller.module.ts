import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SellerComponent } from './seller.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProfileComponent } from './pages/profile/profile.component';


@NgModule({
  declarations: [
    SellerComponent,
    DashboardComponent,
    ProductDetailsComponent,
    ProductListComponent,
    ProfileComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule, IonicModule
  ]
})
export class SellerModule { }
