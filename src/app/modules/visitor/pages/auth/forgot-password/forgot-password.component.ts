import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent  implements OnInit {

  email: string = '';

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private router: Router) { }
  ngOnInit(): void {
  }
  async sendResetLink() {
    if (this.validateEmail(this.email)) {
      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Reset link sent successfully to ' + this.email,
        buttons: ['OK']
      });
      await alert.present();
      setTimeout(() => {
        this.router.navigateByUrl('/otp');
      }, 3000);

    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Please enter a valid email',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
  validateEmail(email: string): boolean {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  }
  goBackToLatestPage() {
    this.navCtrl.back();
  }
  openInscrirePage(){
    this.router.navigateByUrl('/inscrire');
  }
  openLogin(){
    this.router.navigateByUrl('/welcome');
  }
}
