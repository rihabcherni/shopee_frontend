import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inscrire',
  templateUrl: './inscrire.component.html',
  styleUrls: ['./inscrire.component.scss'],
})
export class InscrireComponent  implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private navCtrl: NavController) {}
  ngOnInit() {
  }

  register() {
    if (this.password !== this.confirmPassword) {
      console.log("Passwords don't match");
      return;
    }
    this.navCtrl.navigateForward('/home');
  }

  goBackToLatestPage() {
    this.navCtrl.back();
  }

}
