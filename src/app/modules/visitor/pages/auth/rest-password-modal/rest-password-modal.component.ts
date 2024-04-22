import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { VisitorHeaderService } from 'src/app/services/visitor-header/visitor-header.service';

@Component({
  selector: 'app-rest-password-modal',
  templateUrl: './rest-password-modal.component.html',
  styleUrls: ['./rest-password-modal.component.scss'],
})
export class RestPasswordModalComponent implements OnInit {
  uidb64: string | undefined;
  token: string | undefined;
  resetForm!: FormGroup;
  errorMessages: { [key: string]: { type: string; message: string }[] } = {
    password: [
      { type: 'required', message: 'New Password is required' },
      { type: 'minlength', message: 'New Password must be at least 6 characters long' }
    ],
    confirm_password: [
      { type: 'required', message: 'Confirm Password is required' },
      { type: 'passwordsNotMatch', message: 'Passwords do not match' }
    ]
  };
  getErrorMessages(controlName: string): string[] {
    const control = this.resetForm.get(controlName);
    const errors: string[] = [];
    if (control?.errors) {
      Object.keys(control.errors).forEach(errorType => {
        errors.push(this.errorMessages[controlName].find(message => message.type === errorType)?.message || 'Unknown error');
      });
    }
    return errors;
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private visitorHeaderService: VisitorHeaderService,
    private router: Router) {
    this.visitorHeaderService.pageTitle = 'Reset Password';
    this.visitorHeaderService.subpageTitle = '';
    this.visitorHeaderService.imageSource = 'assets/reset-pass.png';

    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required]
    }, {
      validators: this.passwordsMatchValidator
    });

  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.uidb64 = params['uidb64'];
      this.token = params['token'];
    });
  }

  reset() {
    if (this.resetForm.valid) {
      const formData = this.resetForm.value;
      formData.uidb64 =  this.uidb64;
      formData.token =  this.token;

      this.authService.setNewPassword(formData)
        .subscribe(response => {
          this.alertService.presentAlert('Success', 'Password reset successful','success-alert', 'assets/reset.png');
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
        }, error => {
          console.error('Password reset failed:', error);
          this.alertService.presentAlert('Success', 'Password reset failed','failed-alert', 'assets/error.png');
        });
    }
  }

  passwordsMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.controls['password'];
    const confirmPasswordControl = formGroup.controls['confirm_password'];

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordsNotMatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }
  }
}
