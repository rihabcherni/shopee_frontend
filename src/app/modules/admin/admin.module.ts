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
import { SubcategoryComponent } from './pages/subcategory/subcategory.component';
import { ProductsComponent } from './pages/products/products.component';
import { StarComponent } from './components/star/star.component';
import { ClientsAdminListComponent } from './pages/clients-admin-list/clients-admin-list.component';
import { ClientsDetailsAdminComponent } from './pages/clients-details-admin/clients-details-admin.component';
@NgModule({
  declarations: [
    AdminComponent,
    ProfileComponent,
    SellerListComponent,
    SellerDetailsComponent,
    DashboardComponent,
    MenuComponent,
    SubcategoryComponent,
    ProductsComponent,
    StarComponent,
    ClientsAdminListComponent,
    ClientsDetailsAdminComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
