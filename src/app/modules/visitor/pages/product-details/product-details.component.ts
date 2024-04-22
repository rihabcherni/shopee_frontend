import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';
import { VisitorHeaderService } from 'src/app/services/visitor-header/visitor-header.service';
import { calculateNewPrice, formatDiscount } from 'src/app/utilities';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent  implements OnInit {

  productId?: number;
  product?: Product;
  activeTab: string = 'product';
  mainImageUrl: string | undefined;
  mainImageIndex: number | undefined;
  calculatedRating: number = 0;
  show: boolean= true;


  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService,
    private navCtrl: NavController,
    private visitorHeaderService: VisitorHeaderService
  ) {
    this.visitorHeaderService.pageTitle = 'Product Details';
  }

  ngOnInit() {
    this.productId = this.route.snapshot.params['id'];
    this.getProductDetails();
    if (!localStorage.getItem('cartItems')) {
      localStorage.setItem('cartItems', '[]');
    }
  }
  formatDiscount(discount: any): string {
    return formatDiscount(discount);
  }
  calculateRating() {
    if (this.product && this.product.total_reviews !== 0) {
      this.calculatedRating = this.product.total_ratings / this.product.total_reviews;
    } else {
      this.calculatedRating = 0;
    }
  }

  calculateNewPrice(product: any): number {
    return calculateNewPrice(product)
  }
  updateMainImage(index: number, imageUrl: string) {
    this.mainImageIndex = index;
    this.mainImageUrl = imageUrl;
  }
  getProductDetails() {
    this.productService.getProductDetails(this.productId?? 0)
      .subscribe(data => {
        this.product = data;
        this.calculateRating();
      });
  }
  toggleItem(product: any) {
    this.show=false;
    let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItemIndex = cartItems.findIndex((item: any) => item.id === product.id);
    if (existingItemIndex !== -1) {
      product.quantity = cartItems[existingItemIndex].quantity;
    } else {
      product.quantity = 1;
    }
    this.addToCart(product);
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
  getStarRatings(): number[] {
    const ratings = this.product?.reviews.map(review => review.rating);
    return Array.from(new Set(ratings));
  }

  getNumberOfReviewsByRating(rating: number): number {
    return this.product?.reviews.filter(review => review.rating === rating).length ?? 0;
  }
  calculatePercentage(rating: number): number {
    const numberOfReviews = this.getNumberOfReviewsByRating(rating);
    if (this.product?.total_reviews) {
      return (numberOfReviews * 100) / this.product.total_reviews;
    } else {
      return 0;
    }
  }
  getStarIcons(rating: number): number[] {
    return Array.from({ length: rating });
  }
}
