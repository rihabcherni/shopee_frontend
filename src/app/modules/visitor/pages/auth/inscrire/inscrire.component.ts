import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { VisitorHeaderService } from 'src/app/services/visitor-header/visitor-header.service';

@Component({
  selector: 'app-inscrire',
  templateUrl: './inscrire.component.html',
  styleUrls: ['./inscrire.component.scss'],
})
export class InscrireComponent  implements OnInit {
  registerForm!: FormGroup;
  type_user: string;
    constructor(
      private navCtrl: NavController,
      private authService: AuthService,
      private router: Router,
      private formBuilder: FormBuilder,
      private alertService:AlertService,
      private visitorHeaderService: VisitorHeaderService,
    ) {
      this.visitorHeaderService.pageTitle = 'Create Account';
      this.visitorHeaderService.subpageTitle = 'Register to continue';
      this.visitorHeaderService.imageSource = 'assets/inscrire.png';
      this.type_user = localStorage.getItem('type_user') ?? '';
    }

    ngOnInit() {
      this.registerForm = this.formBuilder.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      });
    }
    async register() {
      if (this.registerForm.invalid) {
        return;
      }
      const first_nameControl = this.registerForm.get('first_name');
      const last_nameControl = this.registerForm.get('last_name');
      const emailControl = this.registerForm.get('email');
      const passwordControl = this.registerForm.get('password');
      const confirmPasswordControl = this.registerForm.get('confirmPassword');

      if (first_nameControl && last_nameControl && emailControl && passwordControl && confirmPasswordControl) {
        const first_name = first_nameControl.value;
        const last_name = last_nameControl.value;
        const email = emailControl.value;
        const password = passwordControl.value;
        const confirmPassword = confirmPasswordControl.value;

        if (password !== confirmPassword) {
          this.alertService.presentAlert('Error', 'Passwords do not match.', 'failed-alert', 'assets/error.png');
          return;
        }

        try {
          const response = await this.authService.register(first_name, last_name, email, password, confirmPassword, this.type_user).toPromise();
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('full_name', response.data['first_name']+ " "+ response.data['last_name']);
          localStorage.setItem('email', response.data['email']);
          localStorage.setItem('photo', "assets/man.png");
          localStorage.removeItem('favoriteItems');
          localStorage.removeItem('cartItems');

          this.router.navigateByUrl('/otp');

          this.alertService.presentAlert('Registration successful.', response.message,'success-alert', 'assets/success-login.png');
        } catch (error) {
          let emailError = '';
          let passwordError = '';

          if (error instanceof HttpErrorResponse && error.error) {
            const errorData = error.error;
            emailError = errorData.email ? errorData.email.join(', ') : '';
            passwordError = errorData.password ? errorData.password.join(', ') : '';
          }
          this.alertService.presentAlert('Error', `Registration failed. Please try again later.
          <p>Email: ${emailError}</p> <p>Password: ${passwordError}</p>
          `, 'failed-alert', 'assets/error.png');
         }
      }
    }
  openLoginPage() {
    this.navCtrl.navigateForward('/login');
  }
  goBackToLatestPage() {
    this.navCtrl.back();
  }

}
