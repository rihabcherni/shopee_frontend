// visitor-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitorComponent } from './visitor.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { InscrireComponent } from './pages/auth/inscrire/inscrire.component';
import { UpdatePasswordComponent } from './pages/auth/update-password/update-password.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { WelcomeLoginComponent } from './pages/welcome-login/welcome-login.component';
import { IndexComponent } from './pages/index/index.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { OtpComponent } from './pages/auth/otp/otp.component';
import { ProfilVisitorComponent } from './pages/auth/profil-visitor/profil-visitor.component';
import { CartVisitorComponent } from './pages/cart-visitor/cart-visitor.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { SubcategoriesComponent } from './pages/subcategories/subcategories.component';

const routes: Routes = [
  {
    path: '',
    component: VisitorComponent,
    children: [
      { path: '', component: WelcomeComponent },
      { path: 'welcome', component: WelcomeLoginComponent },
      { path: 'home', component: IndexComponent },
      { path: 'product-details/:id', component: ProductDetailsComponent },
      { path: 'cart', component: CartVisitorComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'category/:id/subcategories', component: SubcategoriesComponent },

      { path: 'profil-visiteur', component: ProfilVisitorComponent },


      { path: 'login', component: LoginComponent },
      { path: 'inscrire', component: InscrireComponent },
      { path: 'otp', component: OtpComponent },
      { path: 'update-password', component: UpdatePasswordComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitorRoutingModule { }
