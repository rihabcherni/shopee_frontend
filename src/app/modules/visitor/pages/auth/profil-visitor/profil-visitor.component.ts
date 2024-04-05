import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profil-visitor',
  templateUrl: './profil-visitor.component.html',
  styleUrls: ['./profil-visitor.component.scss'],
})
export class ProfilVisitorComponent  implements OnInit {

  constructor(
    private navCtrl: NavController,
    private router: Router
  ) { }
  ngOnInit() {}
  goBackToLatestPage() {
    this.navCtrl.back();
  }
  openLogin() {
    this.router.navigateByUrl('/welcome');
  }
}
