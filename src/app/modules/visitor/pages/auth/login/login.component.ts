import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../../../services/util.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  constructor(
    private util: UtilService,
    private navCtrl: NavController,
    private router: Router
  ) { }
  ngOnInit() {}
  login() {
    this.router.navigateByUrl('/home');
  }
  goBackToLatestPage() {
    this.navCtrl.back();
  }

  openInscrirePage(){
    this.router.navigateByUrl('/inscrire');
  }
  openForgot(){
    this.router.navigateByUrl('/forgot-password');
  }
}
