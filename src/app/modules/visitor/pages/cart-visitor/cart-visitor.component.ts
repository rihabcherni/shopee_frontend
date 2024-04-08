import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart/cart.service';
import { VisitorHeaderService } from 'src/app/services/visitor-header/visitor-header.service';

@Component({
  selector: 'app-cart-visitor',
  templateUrl: './cart-visitor.component.html',
  styleUrls: ['./cart-visitor.component.scss'],
})
export class CartVisitorComponent  implements OnInit {
  cartItems: any[] = [];
  constructor(private cartService: CartService,
    private navCtrl: NavController,
    private visitorHeaderService: VisitorHeaderService,) {
      this.visitorHeaderService.pageTitle = 'Shopping Cart';
      this.visitorHeaderService.imageSource = 'assets/cart.png';
    }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }
  formatDiscount(discount: any): string {
    const discountNumber = parseFloat(discount);
    if (!isNaN(discountNumber)) {
      if (Number.isInteger(discountNumber)) {
        return discountNumber.toString();
      } else {
        return discountNumber.toFixed(2);
      }
    } else {
      return '0';
    }
  }
  addToCart(product: any) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItemIndex = cartItems.findIndex((item: any) => item.id === product.id);
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push({ id: product.id, name: product.name, discount: product.discount, image: product.image, quantity: 1 });
    }
    const updatedCartItems = cartItems.filter((item: { quantity: number; }) => item.quantity !== 0);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    this.updateBadgeCount();
  }
  updateBadgeCount() {
    const totalQuantity = this.cartService.calculateTotalQuantity();
    this.cartService.updateCartItemCount(totalQuantity);
  }
  incrementItem(product: any) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItemIndex = cartItems.findIndex((item: any) => item.id === product.id);

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += 1;
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
    product.quantity=cartItems[existingItemIndex].quantity;
    this.updateBadgeCount();
  }
  decrementItem(product: any) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItemIndex = cartItems.findIndex((item: any) => item.id === product.id);
    if (existingItemIndex !== -1 && cartItems[existingItemIndex].quantity > 0) {
      cartItems[existingItemIndex].quantity -= 1;
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
    product.quantity=cartItems[existingItemIndex].quantity;
    this.updateBadgeCount();
  }
  addToFavorites() {
    throw new Error('Method not implemented.');
  }
  goBackToLatestPage() {
    this.navCtrl.back();
  }

  getTotalSum(): number {
    let totalSum = 0;
    for (const item of this.cartItems) {
      totalSum += item.price * item.quantity;
    }
    return parseFloat(totalSum.toFixed(3));
  }
  getTotalSumDiscount(): number {
    let totalSum = 0;
    for (const item of this.cartItems) {
      const discountedPrice = item.price - (item.price * parseFloat(item.discount) / 100);
      totalSum += discountedPrice * item.quantity;
    }
    return parseFloat(totalSum.toFixed(3));
  }
  chunk(array: any[], size: number): any[][] {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
}
