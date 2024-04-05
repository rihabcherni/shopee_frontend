import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SellerRoutingModule } from './seller-routing.module';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { EditProfileModalComponent } from './pages/edit-profile-modal/edit-profile-modal.component';
import { ProductDetailsModalComponent } from './components/product-details-modal/product-details-modal.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { SellerComponent } from './seller.component';

@NgModule({
  declarations: [ProductListComponent,ProfileComponent,SellerComponent, ProductDetailsModalComponent, AddProductComponent, EditProfileModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellerRoutingModule
  ],
  exports: [ProductListComponent,ProfileComponent,SellerComponent, ProductDetailsModalComponent, AddProductComponent, EditProfileModalComponent]
})
export class SellerModule { }
