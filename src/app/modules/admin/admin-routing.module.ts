import { MenuComponent } from './pages/menu/menu.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { SellerListComponent } from './pages/seller-list/seller-list.component';
import { SellerDetailsComponent } from './pages/seller-details/seller-details.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SubcategoryComponent } from './pages/subcategory/subcategory.component';
import { ProductsComponent } from './pages/products/products.component';
import { ClientsAdminListComponent } from './pages/clients-admin-list/clients-admin-list.component';
import { ClientsDetailsAdminComponent } from './pages/clients-details-admin/clients-details-admin.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'sellers', component: SellerListComponent },
      { path: 'clients', component: ClientsAdminListComponent },
      { path: 'profil', component: ProfileComponent },
      { path: 'seller-details/:id', component: SellerDetailsComponent },
      { path: 'client-details/:id', component: ClientsDetailsAdminComponent },
      { path: 'category/:id/subcategories', component: SubcategoryComponent },
      { path: 'category/:category/subcategories/:subcategory/products', component: ProductsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
