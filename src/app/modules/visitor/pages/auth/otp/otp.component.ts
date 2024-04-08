import { Component, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { VisitorHeaderService } from 'src/app/services/visitor-header/visitor-header.service';
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
    private navCtrl: NavController,private visitorHeaderService: VisitorHeaderService,
    private router: Router) {
      this.visitorHeaderService.pageTitle = 'OTP Verification';
      this.visitorHeaderService.imageSource = 'assets/otp.png';
    }

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
