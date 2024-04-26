import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClientComponent } from './client.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ClientsDashComponent } from './pages/clients-dash/clients-dash.component';



@NgModule({
  declarations: [
    ClientComponent,
    DashboardComponent,
    PaymentComponent,
    ProfileComponent,
    ClientsDashComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ClientModule { }
