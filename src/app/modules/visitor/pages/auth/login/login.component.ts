import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VisitorHeaderService } from 'src/app/services/visitor-header/visitor-header.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private visitorHeaderService: VisitorHeaderService,
    private alertController: AlertController
  ) {
    this.visitorHeaderService.pageTitle = 'Welcome Back';
    this.visitorHeaderService.subpageTitle = 'Login to continue';
    this.visitorHeaderService.imageSource = 'assets/login.png';
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async login() {
    if (this.loginForm.invalid) {
      return;
    }
    const emailControl = this.loginForm.get('email');
    const passwordControl = this.loginForm.get('password');

    if (emailControl && passwordControl) {
      const email = emailControl.value;
      const password = passwordControl.value;

      try {
        const response = await this.authService.login(email, password).toPromise();
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('type_user', response.type_user);
        localStorage.setItem('full_name', response.full_name);
        localStorage.setItem('email', response.email);

        const userType = response.type_user;
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
        this.presentAlert('Login successful.', 'Your account is ready to use. You will be redirected to the Home page in a few seconds.', 'success-alert','assets/success-login.png');
      } catch (error) {
        console.error('Login failed:', error);
        this.presentAlert('Error', 'Login failed. Please check your credentials.', 'failed-alert','assets/error.png');
      }
    }
  }

  async presentAlert(header: string, message: string, cssClass: string, imageUrl: string) {
    const alert = await this.alertController.create({
      header,
      cssClass,
      message: `
        <div>
          <img src="${imageUrl}">
          <p>${message}</p>
        </div>
      `,
      buttons: ['OK']
    });

    await alert.present();
  }

  goBackToLatestPage() {
    this.navCtrl.back();
  }

  openInscrirePage() {
    this.router.navigateByUrl('/role-type');
  }

  openForgot() {
    this.router.navigateByUrl('/forgot-password');
  }
}
