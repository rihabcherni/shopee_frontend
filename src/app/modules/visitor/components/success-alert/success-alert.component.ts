import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-success-alert',
  templateUrl: './success-alert.component.html',
  styleUrls: ['./success-alert.component.scss'],
})
export class SuccessAlertComponent  implements OnInit {
  @Input() message: string | undefined;

  constructor(private alertController: AlertController) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: this.message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
