import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { VisitorHeaderService } from 'src/app/services/visitor-header/visitor-header.service';

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

  constructor(
    private navCtrl: NavController,
    private visitorHeaderService: VisitorHeaderService,) {
      this.visitorHeaderService.pageTitle = 'Welcome';
      this.visitorHeaderService.subpageTitle = 'Create your account';
      this.visitorHeaderService.imageSource = 'assets/inscrire.png';
    }

  ngOnInit() {
  }

  register() {
    if (this.password !== this.confirmPassword) {
      console.log("Passwords don't match");
      return;
    }
    this.navCtrl.navigateForward('/home');
  }
  openLoginPage() {
    this.navCtrl.navigateForward('/login');
  }
  goBackToLatestPage() {
    this.navCtrl.back();
  }

}
