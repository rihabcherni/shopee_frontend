import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})

export class AdminComponent {

  constructor(private router: Router) {}
  isPageActive(pageUrl: string): boolean {
    return this.router.isActive(pageUrl, true);
  }
  
  

}
