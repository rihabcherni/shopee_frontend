import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Product } from 'src/app/models/Product';
import { FavoriteService } from 'src/app/services/favorite/favorite.service';
import { VisitorHeaderService } from 'src/app/services/visitor-header/visitor-header.service';
import { formatDiscount } from 'src/app/utilities';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent  implements OnInit {
  favoriteItems: Product[] =[];
  constructor(private favoriteService: FavoriteService,
    private navCtrl: NavController,
    private visitorHeaderService: VisitorHeaderService,) {
      this.visitorHeaderService.pageTitle = 'Wishlist';
      this.visitorHeaderService.imageSource = 'assets/wishlist.png';
    }
  ngOnInit(): void {
    this.favoriteItems = this.favoriteService.getFavorites();
    this.updateFavoriteBadgeCount();
  }

  formatDiscount(discount: any): string {
    return formatDiscount(discount);
  }
  updateFavoriteBadgeCount() {
    const totalQuantity = this.favoriteService.calculateTotalQuantity();
    this.favoriteService.updateFavoriteItemCount(totalQuantity);
  }
  goBackToLatestPage() {
    this.navCtrl.back();
  }
  chunk(array: any[], size: number): any[][] {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
}
