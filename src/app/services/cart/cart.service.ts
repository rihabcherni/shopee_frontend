import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemCountSource = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSource.asObservable();

  constructor() { }

  updateCartItemCount(count: number) {
    this.cartItemCountSource.next(count);
  }

  calculateTotalQuantity(): number {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    return  cartItems.filter((item: any) => item.quantity !== 0).reduce((total: number, item: any) => total + item.quantity, 0);
  }


  getCartItems(): any[] {
    const cartItemsString = localStorage.getItem('cartItems');
    return cartItemsString ? JSON.parse(cartItemsString) : [];
  }
}
