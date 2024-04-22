import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart/cart.service';
import { FavoriteService } from 'src/app/services/favorite/favorite.service';
import { ProductService } from 'src/app/services/product/product.service';
import { VisitorHeaderService } from 'src/app/services/visitor-header/visitor-header.service';
import { calculateNewPrice, formatDiscount } from 'src/app/utilities';

@Component({
  selector: 'app-cart-visitor',
  templateUrl: './cart-visitor.component.html',
  styleUrls: ['./cart-visitor.component.scss'],
})
export class CartVisitorComponent  implements OnInit {
  products: Product[] = [];
  cartItems: any[] = [];
  constructor(private cartService: CartService,
    private navCtrl: NavController,
    private productService: ProductService,
    private router: Router,
    private visitorHeaderService: VisitorHeaderService,
    private favoriteService: FavoriteService) {
      this.visitorHeaderService.pageTitle = 'Shopping Cart';
      this.visitorHeaderService.imageSource = 'assets/cart.png';
    }
  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.loadProducts();
    if (!localStorage.getItem('cartItems')) {
      localStorage.setItem('cartItems', '[]');
    }
    if (!localStorage.getItem('favoriteItems')) {
      localStorage.setItem('favoriteItems', '[]');
    }
  }
  loadProducts() {
    this.productService.getProductsNotInCart().subscribe((data: Product[]) => {
      this.products = data;
      console.log(data)
    });
  }

  formatDiscount(discount: any): string {
    return formatDiscount(discount);
  }
  openProductDetails(product: Product) {
    this.router.navigate(['/product-details', product.id]);
  }
  addToCart(product: any) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItemIndex = cartItems.findIndex((item: any) => item.id === product.id);
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        rating:  product.total_reviews > 0 ?
          (product.total_ratings / product.total_reviews % 1 !== 0 ?
            (product.total_ratings / product.total_reviews).toFixed(2) :
            (product.total_ratings / product.total_reviews)) :
            0 ,
        discount: product.discount,
        total_reviews: product.total_reviews,
        image: product.image,
        brand: product.brand,
        quantity: 1 });
    }
    const updatedCartItems = cartItems.filter((item: { quantity: number; }) => item.quantity !== 0);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    this.updateBadgeCount();
    this.cartItems = this.cartService.getCartItems();
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
      if (cartItems[existingItemIndex].quantity === 0) {
        cartItems.splice(existingItemIndex, 1);
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
    product.quantity = cartItems[existingItemIndex] ? cartItems[existingItemIndex].quantity : 0;
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

  toggleItem(product: any) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItemIndex = cartItems.findIndex((item: any) => item.id === product.id);
    if (existingItemIndex !== -1) {
      product.quantity = cartItems[existingItemIndex].quantity;
    } else {
      product.quantity = 1;
    }
    this.addToCart(product);
  }
  updateFavoriteBadgeCount() {
    const totalQuantity = this.favoriteService.calculateTotalQuantity();
    this.favoriteService.updateFavoriteItemCount(totalQuantity);
  }
  toggleFavorite(product: Product): void {
    if (this.favoriteService.isInFavorites(product)) {
      this.favoriteService.removeFromFavorites(product);
    } else {
      this.favoriteService.addToFavorites(product);
    }
    this.updateFavoriteBadgeCount();
}
calculateNewPrice(product: any): number {
  return calculateNewPrice(product)
}

}
