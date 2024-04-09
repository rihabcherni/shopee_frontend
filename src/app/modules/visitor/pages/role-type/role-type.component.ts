import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { VisitorHeaderService } from 'src/app/services/visitor-header/visitor-header.service';

@Component({
  selector: 'app-role-type',
  templateUrl: './role-type.component.html',
  styleUrls: ['./role-type.component.scss'],
})
export class RoleTypeComponent  implements OnInit {
  type_user: string = 'client';
  saveRole: boolean = false;

  constructor(
    private navCtrl: NavController,
    private visitorHeaderService: VisitorHeaderService
  ) {
    this.visitorHeaderService.pageTitle = 'Choose Account role';
    this.visitorHeaderService.imageSource = 'assets/role.png';
  }

  ngOnInit() {
    localStorage.setItem('type_user',this.type_user);
    const savedRole = localStorage.getItem('type_user');
    if (savedRole) {
      this.type_user = savedRole;
      this.saveRole = true;
    }
  }
  selectRole(role: string) {
    this.type_user = role;
  }
  navigateToNextPage() {
    this.navCtrl.navigateForward('/inscrire');
  }
  saveRoleChanged() {
    if (this.saveRole) {
      localStorage.setItem('type_user', this.type_user);
    } else {
      localStorage.removeItem('type_user');
    }
    this.navigateToNextPage();
  }
}
