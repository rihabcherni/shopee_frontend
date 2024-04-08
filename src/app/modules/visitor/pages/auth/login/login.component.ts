import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../../../services/util.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { VisitorHeaderService } from 'src/app/services/visitor-header/visitor-header.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  constructor(
    private navCtrl: NavController,
    private router: Router,
    private visitorHeaderService: VisitorHeaderService,) {
      this.visitorHeaderService.pageTitle = 'Welcome Back';
      this.visitorHeaderService.subpageTitle = 'Login to continue';
      this.visitorHeaderService.imageSource = 'assets/login.png';
    }
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
