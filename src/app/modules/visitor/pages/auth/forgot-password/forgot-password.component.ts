import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { VisitorHeaderService } from 'src/app/services/visitor-header/visitor-header.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  email: string = '';

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private visitorHeaderService: VisitorHeaderService,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.visitorHeaderService.pageTitle = 'Forgot Password';
    this.visitorHeaderService.subpageTitle = '';
    this.visitorHeaderService.imageSource = 'assets/forgot.png';
  }

  ngOnInit(): void {
  }
  async sendResetLink() {
    if (this.validateEmail(this.email)) {
      try {
        const response = await this.authService.sendResetLink(this.email).toPromise();
        this.alertService.presentAlert('Success', 'Reset link sent successfully to ' + this.email,'success-alert', 'assets/forgot.png');
        this.router.navigateByUrl(`/reset-password/${response.uidb64}/${response.token}`);
      } catch (error) {
        this.alertService.presentAlert('Error', 'Failed to send reset link. Please try again later.','failed-alert', 'assets/error.png');
      }
    } else {
      this.alertService.presentAlert('Error', 'Please enter a valid email','failed-alert', 'assets/error.png');
    }
  }

  validateEmail(email: string): boolean {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  }

  goBackToLatestPage() {
    this.navCtrl.back();
  }

  openInscrirePage() {
    this.router.navigateByUrl('/role-type');
  }

  openLogin() {
    this.router.navigateByUrl('/welcome');
  }
}
