import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private http: HttpClient, private alertController : AlertController) { }
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
    });

    await alert.present();
    setTimeout(() => {
      alert.dismiss();
    }, 3000);
  }
}
