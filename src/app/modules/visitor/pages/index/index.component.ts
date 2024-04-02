import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import Swiper from 'swiper';
import { interval } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  randomOffer: any;
  offers = [
    { id: 1, name: '20% off on all electronics', discount: 20 },
    { id: 2, name: 'Buy one, get one free on selected items', discount: 50},
    { id: 3, name: 'Free shipping on orders over $50', discount: 100},
    { id: 4, name: 'Bundle deal: Save 20% on a laptop and keyboard', discount: 20},
    { id: 5, name: 'Flash sale: 30% off on all clothing items', discount: 30 },
    { id: 6, name: 'Exclusive 10% off for Gold members', discount: 10 },
    { id: 7, name: 'Use code SPRING2 to get 5% off your next order', discount: 5 }
  ];

  toggleItem(product: any) {
    if (product.quantity === 0) {
      product.quantity = 1;
    }
  }
  incrementItem(product: any) {
    product.quantity = (product.quantity || 0) + 1;
  }

  decrementItem(product: any) {
    if (product.quantity && product.quantity > 0) {
      product.quantity--;
    }
    console.log(product.quantity)
  }



  addToFavorites() {
  }

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  segmentList: Array<string> = [];
  selectedSegment: string = '';
  categories: any[] = [];
  subcategories: any[] = [];
  filteredProducts: any[] = [];
  searchQuery: string = '';
  selectedCategory: any;
  selectedSubcategory: any;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.fetchCategories();
    this.getRandomOffer();
    interval(5000)
    .subscribe(() => {
      this.getRandomOffer();
    });
  }

  getRandomOffer(): void {
    const randomIndex = Math.floor(Math.random() * this.offers.length);
    this.randomOffer = this.offers[randomIndex];
  }
  fetchCategories() {
    this.http.get<any[]>('http://127.0.0.1:8000/api/products/categories/')
      .subscribe(categories => {
        this.categories = categories.map(category => ({
          name: category.name,
          subcategories: category.subcategories.map((subcategory: any) => ({
            ...subcategory,
            products: []
          }))
        }));
        this.categories.unshift({ name: 'All', subcategories: [] });
        this.segmentList = this.categories.map(category => category.name);
        this.selectedSegment = this.segmentList[0];
        this.selectProductCategory(this.selectedSegment);
        this.fetchSubCategories(this.selectedSegment);
      });
  }

  fetchSubCategories(categoryName: string) {
    const url = `http://127.0.0.1:8000/api/products/subcategories/${categoryName}`;
    this.http.get<any[]>(url)
      .subscribe(subcategories => {
        this.subcategories = subcategories.map(subcategory => ({
          name: subcategory.name,
          image: `http://localhost:8000${subcategory.image}`
        }));
        if(categoryName!== 'All'){
          this.subcategories.unshift({ name: 'All', products: [] });
        }else{
          this.subcategories=[];
        }
        this.segmentList = this.subcategories.map(subcategory => subcategory.name);
        this.selectedSegment = this.segmentList[0];
        this.selectSubCategory(this.selectedSegment);
      });
  }

  selectSubCategory(subcategoryName: string) {
    this.selectedSegment = subcategoryName;
    this.filterProducts(this.selectedCategory, subcategoryName);
  }

  selectProductCategory(categoryName: string) {
    this.selectedSegment = categoryName;
    this.selectedCategory = categoryName;
    this.fetchSubCategories(categoryName);
    this.filterProducts(categoryName, 'All');
  }

  filterProducts(categoryName: string, subcategoryName: string) {
    let url="";
    if (categoryName === 'All') {
      this.http.get<any[]>('http://127.0.0.1:8000/api/products/products/')
      .subscribe(products => {
        this.filteredProducts = products.map(product => ({
          ...product,
          quantity: 0
        }));
        console.log(products);
      });
    } else {
      if(subcategoryName==='All'){
        url = `http://127.0.0.1:8000/api/products/product/${categoryName}/`;
     }else if(subcategoryName===''){
        url = `http://127.0.0.1:8000/api/products/product/${categoryName}/`;
     }else{
         url = `http://127.0.0.1:8000/api/products/product/${categoryName}/${subcategoryName}/`;
      }
      this.http.get<any[]>(url)
        .subscribe(products => {
          this.filteredProducts = products.map(product => ({
            ...product,
            image: `http://localhost:8000${product.image}`
          }));
        });
    }
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

  goBack() {
    this.router.navigateByUrl('/');
  }

  searchProducts(event: any) {
    console.log('Searching products for:', this.searchQuery);
  }

  openLogin() {
    this.router.navigateByUrl('/welcome');
  }

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  swiperSlideChanged(e: any) {
    const index = e.target.swiper.activeIndex
    this.selectedSegment = this.segmentList[index]
  }

  _segmentSelected(index: number) {
    this.swiper?.slideTo(index)
  }

  openProductDetails(productId: number) {
    this.router.navigate(['/product-details', productId]);
  }
}


