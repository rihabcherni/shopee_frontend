import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.scss'],
})
export class VisitorComponent  implements OnInit {
  isWelcomePage: boolean = false;
  welcomePages: string[] = ['/','/welcome', '/login', '/inscrire','/forgot-password','/otp','/update-password'];

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isWelcomePage = this.welcomePages.includes(event.url);
      }
    });
  }
  ngOnInit() {
  }
}
