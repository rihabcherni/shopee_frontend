// visitor-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitorComponent } from './visitor.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { InscrireComponent } from './pages/inscrire/inscrire.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { WelcomeLoginComponent } from './pages/welcome-login/welcome-login.component';
import { IndexComponent } from './pages/index/index.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { OtpComponent } from './pages/otp/otp.component';

const routes: Routes = [
  {
    path: '',
    component: VisitorComponent,
    children: [
      { path: '', component: WelcomeComponent },
      { path: 'welcome', component: WelcomeLoginComponent },
      { path: 'home', component: IndexComponent },
      { path: 'login', component: LoginComponent },
      { path: 'inscrire', component: InscrireComponent },
      { path: 'otp', component: OtpComponent },
      { path: 'update-password', component: UpdatePasswordComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'product-details/:id', component: ProductDetailsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitorRoutingModule { }
