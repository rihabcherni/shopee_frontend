import { Component, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { VisitorHeaderService } from 'src/app/services/visitor-header/visitor-header.service';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent  {
  otpDigits: string[] = ['', '', '', ''];
  otpDigitInputs: string[] = ['', '', '', ''];
  activeInput: number | null = null;
  email:string="";
  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private navCtrl: NavController,private visitorHeaderService: VisitorHeaderService,
    private router: Router) {
      this.visitorHeaderService.pageTitle = 'OTP Verification';
      this.visitorHeaderService.imageSource = 'assets/otp.png';
      this.email = localStorage.getItem('email') ?? '';
    }
  activateInput(index: number) {
    this.activeInput = index;
  }

  isFormValid(): boolean {
    return this.otpDigitInputs.every(digit => digit !== '');
  }
  async verifyOTP() {
    const enteredOTP = this.otpDigitInputs.join('');
    try {
      const response = await this.authService.verifyOTP(enteredOTP);
      if (response && response.message === 'Account email verified successfully') {
        this.presentAlert('OTP verification successful!', response.message,'success-alert', 'assets/success-login.png');
        const userType =  localStorage.getItem('type_user');
        setTimeout(()=>{
          switch (userType) {
            case 'admin':
              this.router.navigateByUrl('/admin');
              break;
            case 'seller':
              this.router.navigateByUrl('/seller');
              break;
            case 'client':
              this.router.navigateByUrl('/client');
              break;
            default:
              break;
          }
        },2000)
      } else {
        this.presentAlert('OTP verification', 'Invalid OTP, user is already verified. Please try again.','failed-alert', 'assets/success-login.png');
      }
    } catch (error) {
      this.presentAlert('Error', 'An error occurred while verifying OTP. Please try again later.','failed-alert', 'assets/success-login.png');
    }
  }
  goBackToLatestPage() {
    this.navCtrl.back();
  }


  async presentAlert(header: string, message: string, cssClass: string, imageUrl: string) {
    const alert = await this.alertController.create({
      header,
      cssClass,
      message: `
        <div>
          <img src="${imageUrl}" style="max-width: 100%;">
          <p>${message}</p>
        </div>
      `,
    });

    await alert.present();
    setTimeout(() => {
      alert.dismiss();
    }, 3000);
  }

}
