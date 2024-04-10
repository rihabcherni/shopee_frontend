// visitor.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { VisitorComponent } from './visitor.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { WelcomeLoginComponent } from './pages/auth/welcome-login/welcome-login.component';
import { InscrireComponent } from './pages/auth/inscrire/inscrire.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './pages/auth/update-password/update-password.component';
import { IndexComponent } from './pages/index/index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OtpComponent } from './pages/auth/otp/otp.component';
import { ProfilVisitorComponent } from './pages/auth/profil-visitor/profil-visitor.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { SubcategoriesComponent } from './pages/subcategories/subcategories.component';
import { CartVisitorComponent } from './pages/cart-visitor/cart-visitor.component';
import { SubcategoriesProductsComponent } from './pages/subcategories-products/subcategories-products.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { VisitorHeaderComponent } from './components/visitor-header/visitor-header.component';
import { SuccessAlertComponent } from './components/success-alert/success-alert.component';
import { FailedAlertComponent } from './components/failed-alert/failed-alert.component';
import { RoleTypeComponent } from './pages/auth/role-type/role-type.component';
import { RestPasswordModalComponent } from './pages/auth/rest-password-modal/rest-password-modal.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

@NgModule({
  declarations: [
    VisitorComponent,
    LoginComponent,
    WelcomeComponent,
    WelcomeLoginComponent,
    InscrireComponent,
    RoleTypeComponent,
    ForgotPasswordComponent,
    UpdatePasswordComponent,
    IndexComponent,RestPasswordModalComponent,
    OtpComponent,
    ProfilVisitorComponent,
    CategoriesComponent,
    SubcategoriesComponent,
    CartVisitorComponent,
    SubcategoriesProductsComponent,
    ProductDetailsComponent,
    FavoriteComponent,
    StarRatingComponent,
    VisitorHeaderComponent,
    SuccessAlertComponent,
    FailedAlertComponent,
  ]
  ,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, IonicModule,FormsModule, ReactiveFormsModule],
  exports: [VisitorComponent]
})
export class VisitorModule { }
