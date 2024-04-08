import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { VisitorHeaderService } from 'src/app/services/visitor-header/visitor-header.service';

@Component({
  selector: 'app-profil-visitor',
  templateUrl: './profil-visitor.component.html',
  styleUrls: ['./profil-visitor.component.scss'],
})
export class ProfilVisitorComponent  implements OnInit {

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private visitorHeaderService: VisitorHeaderService,) {
      this.visitorHeaderService.pageTitle = 'Profil';
    }
  ngOnInit() {}
  goBackToLatestPage() {
    this.navCtrl.back();
  }
  openLogin() {
    this.router.navigateByUrl('/welcome');
  }
}
