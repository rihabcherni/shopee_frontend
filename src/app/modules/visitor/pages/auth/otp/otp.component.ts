import { Component, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent  {
  otpDigits: string[] = ['', '', '', ''];
  otpDigitInputs: string[] = ['', '', '', ''];

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private router: Router) { }
  async verifyOTP() {
    const enteredOTP = this.otpDigitInputs.join('');
    const expectedOTP = '1234';

    if (enteredOTP === expectedOTP) {
      const alert = await this.alertController.create({
        header: 'Success',
        message: 'OTP verification successful!',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Invalid OTP. Please try again.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
  goBackToLatestPage() {
    this.navCtrl.back();
  }
}
