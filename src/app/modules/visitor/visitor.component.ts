import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { FavoriteService } from 'src/app/services/favorite/favorite.service';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.scss'],
})
export class VisitorComponent  implements OnInit {
  isWelcomePage: boolean = false;
  welcomePages: string[] = ['/','/welcome', '/login','/forgot-password','/reset-password','/otp','/update-password','/role-type', '/inscrire'];
  cartItemCount: number=0;
  favoriteItemCount: number=0;
  constructor(private router: Router,private cartService: CartService,private favoriteService: FavoriteService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if( this.isWelcomeRoute()){
          this.isWelcomePage = this.isWelcomeRoute();
        }else{
          this.isWelcomePage = this.welcomePages.includes(event.url);
        }
      }
    });
  }
  ngOnInit() {
    this.updateBadgeCount()
    this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });

    this.updateFavoriteBadgeCount()
    this.favoriteService.favoriteItemCount$.subscribe(count => {
      this.favoriteItemCount = count;
    });
  }
  updateBadgeCount() {
    const totalQuantity = this.cartService.calculateTotalQuantity();
    this.cartService.updateCartItemCount(totalQuantity);
  }
  updateFavoriteBadgeCount() {
    const totalQuantity = this.favoriteService.calculateTotalQuantity();
    this.favoriteService.updateFavoriteItemCount(totalQuantity);
  }
  isWelcomeRoute(): boolean {
    return this.router.url.includes('/reset-password');
  }
}
