import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientsDashComponent } from './pages/clients-dash/clients-dash.component';
import { ClientOrderComponent } from './pages/client-order/client-order.component';
import { SubcategoriesProductsComponent } from '../visitor/pages/subcategories-products/subcategories-products.component';
import { SubcategoriesComponent } from '../visitor/pages/subcategories/subcategories.component';
import { CategoriesComponent } from '../visitor/pages/categories/categories.component';
import { ProductDetailsComponent } from '../visitor/pages/product-details/product-details.component';
import { FavoriteComponent } from '../visitor/pages/favorite/favorite.component';
import { CartVisitorComponent } from '../visitor/pages/cart-visitor/cart-visitor.component';

const routes: Routes = [
  {
    path: 'client',
    component: ClientComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'profil', component: ProfileComponent },
      { path: 'dashboard', component: ClientsDashComponent },
      { path: 'cart', component: CartVisitorComponent },
      { path: 'order', component: ClientOrderComponent },
      { path: 'payment/:id', component: PaymentComponent },


      { path: 'product-details/:id', component: ProductDetailsComponent },
      { path: 'favorite', component: FavoriteComponent },
      { path: 'store/categories', component: CategoriesComponent },
      { path: 'store/category/:id/subcategories', component: SubcategoriesComponent },
      { path: 'store/category/:category/subcategories/:subcategory/products', component: SubcategoriesProductsComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
