import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SellerListComponent } from './pages/seller-list/seller-list.component';
import { SellerDetailsComponent } from './pages/seller-details/seller-details.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    AdminComponent,
    ProfileComponent,
    SellerListComponent,
    SellerDetailsComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class AdminModule { }
