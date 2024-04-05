import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SellerListComponent } from './pages/seller-list/seller-list.component';
import { SellerDetailsComponent } from './pages/seller-details/seller-details.component';
import { IonicModule } from '@ionic/angular';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MenuComponent } from './pages/menu/menu.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
@NgModule({
  declarations: [
    AdminComponent,
    ProfileComponent,
    SellerListComponent,
    SellerDetailsComponent,
    DashboardComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule 
  ]
})
export class AdminModule { }
 