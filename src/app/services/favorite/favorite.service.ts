import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/Product';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favoriteItemCountSource = new BehaviorSubject<number>(0);
  favoriteItemCount$ = this.favoriteItemCountSource.asObservable();
  private readonly FAVORITES_KEY = 'favoriteItems';

  constructor() { }

  updateFavoriteItemCount(count: number) {
    this.favoriteItemCountSource.next(count);
  }

  calculateTotalQuantity(): number {
    const favoriteItems = JSON.parse(localStorage.getItem('favoriteItems') || '[]');
    return favoriteItems.length;
  }
  getFavorites(): Product[] {
    return JSON.parse(localStorage.getItem(this.FAVORITES_KEY) || '[]');
  }

  addToFavorites(product: Product): void {
    const favorites = this.getFavorites();
    if (!this.isInFavorites(product)) {
      favorites.push(product);
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
    }
  }

  removeFromFavorites(product: Product): void {
    let favorites = this.getFavorites();
    favorites = favorites.filter(p => p.id !== product.id);
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
  }

  isInFavorites(product: Product): boolean {
    const favorites = this.getFavorites();
    return favorites.some(p => p.id === product.id);
  }
}
