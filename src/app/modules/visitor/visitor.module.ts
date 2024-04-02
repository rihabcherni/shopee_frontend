// visitor.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { VisitorComponent } from './visitor.component';
import { LoginComponent } from './pages/login/login.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { WelcomeLoginComponent } from './pages/welcome-login/welcome-login.component';
import { InscrireComponent } from './pages/inscrire/inscrire.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';
import { IndexComponent } from './pages/index/index.component';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OtpComponent } from './pages/otp/otp.component';

@NgModule({
  declarations: [
    VisitorComponent,
    LoginComponent,
    WelcomeComponent,
    WelcomeLoginComponent,
    InscrireComponent,
    ForgotPasswordComponent,
    UpdatePasswordComponent,
    IndexComponent,
    OtpComponent,
  ]
  ,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, IonicModule,FormsModule],
  exports: [VisitorComponent]
})
export class VisitorModule { }
