import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-login',
  templateUrl: './welcome-login.component.html',
  styleUrls: ['./welcome-login.component.scss'],
})
export class WelcomeLoginComponent  implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {}
  openLogin() {
    this.router.navigateByUrl('/login');
  }

  skipLogin() {
    this.router.navigateByUrl('/home');
  }
}
