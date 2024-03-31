import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent  implements OnInit {

  constructor(private router: Router, private alertController: AlertController,private http: HttpClient) {}


  async presentAlert() {
    const alert = await this.alertController.create({
      message:  `
      </div>
      <div class="container">
        <h2>Welcome to our newsletter!<h2>
        <p>Stay up-to-date with the latest deals, offers, and news from be-trendy. Subscribe to our newsletter today and never miss out on great savings!</p>
      </div>
      `,
      inputs: [
        {
          name: 'Email',
          type: 'email',
          placeholder: 'Email',
        }
      ],

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Subscribe',
          handler: (formData: { Email: string }) => {
            if (formData.Email && this.validateEmail(formData.Email)){
              this.subscribeUser(formData.Email);
              return formData;
            } else {
              if (!alert.getElementsByClassName('validation-errors').length) {
                const input = alert.getElementsByTagName('input')[0];

                const validationErrors = document.createElement('div');
                validationErrors.className = 'validation-errors';

                const errorMessage = document.createElement('small');
                errorMessage.classList.add('error-message');
                errorMessage.textContent = 'Please enter a valid email address.';

                validationErrors.appendChild(errorMessage);

                input.insertAdjacentElement('afterend', validationErrors);
              }

              return false;
            }
          }}
      ],
      cssClass: 'custom-modal'
    });
    return await alert.present();
  }
  subscribeUser(email: string) {
    if (!email || !this.validateEmail(email)) {
      return;
    }
    const requestBody = { email };
    this.http.post('http://127.0.0.1:8000/api/auth/subscribes/', requestBody)
      .subscribe(
        (response) => {
          console.log('Subscription successful:', response);
          this.presentSuccessAlert('Subscription Successful', 'You have been successfully subscribed to our newsletter.');
        },
        (error) => {
          console.error('Subscription failed:', error);
            this.presentErrorAlert('Subscription Failed', 'You have already subscribed to our newsletter.');
         }
      );
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async presentSuccessAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
      cssClass: 'custom-modal-success'
    });
    await alert.present();
  }
  async presentErrorAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
      cssClass: 'custom-modal-error'
    });
    await alert.present();
  }
  ngOnInit() {
    setTimeout(() => {
      this.router.navigateByUrl('/home');
      this.presentAlert();
    }, 5000);
  }
}
