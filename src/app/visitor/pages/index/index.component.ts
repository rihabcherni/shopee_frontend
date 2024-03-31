import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import Swiper from 'swiper';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  segmentList: Array<string> = [];
  selectedSegment: string = '';
  categories: any[] = [];
  filteredProducts: any[] = [];
  searchQuery: string = '';

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories() {
    this.http.get<any[]>('http://127.0.0.1:8000/api/products/categories/')
      .subscribe(categories => {
        this.categories = categories.map(category => ({
          name: category.name,
          products: null // Initialize products as null, we'll fetch them later
        }));
        // Update segmentList and selectedSegment
        this.segmentList = this.categories.map(category => category.name);
        this.selectedSegment = this.segmentList[0];
        // Fetch products for the initial selected category
        this.selectCategory(this.selectedSegment);
      });
  }

  selectCategory(categoryName: string) {
    this.selectedSegment = categoryName;
    if (categoryName === 'All') {
      this.filteredProducts = [].concat(...this.categories.map(category => category.products));
    } else {
      const selectedCategory = this.categories.find(category => category.name === categoryName);
      if (selectedCategory) {
        // Fetch products for the selected category
        this.http.get<any[]>(`http://127.0.0.1:8000/api/products/product/${categoryName}`)
          .subscribe(products => {
            selectedCategory.products = products;
            this.filteredProducts = selectedCategory.products;
          });
      }
    }
  }

  goBack() {
    this.router.navigateByUrl('/');
  }

  searchProducts(event: any) {
    // Implement your search logic here
    console.log('Searching products for:', this.searchQuery);
  }

  openLogin() {
    this.router.navigateByUrl('/login');
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
}





















// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { Router } from '@angular/router';
// import { NavController } from '@ionic/angular';
// import Swiper from 'swiper';

// @Component({
//   selector: 'app-index',
//   templateUrl: './index.component.html',
//   styleUrls: ['./index.component.scss'],
// })
// export class IndexComponent implements OnInit {

//   @ViewChild('swiper')
//   swiperRef: ElementRef | undefined;
//   swiper?: Swiper;
//   segmentList: Array<string> = ['All', 'Best Seller', 'Coat', 'Jeans', 'Jacket','Dress'];
//   selectedSegment: string = this.segmentList[0];
//   categories: any[] = [
//     { name: 'All', products: null },
//     { name: 'Best Seller', products: this.generateProducts(2,"Best Seller") },
//     { name: 'Coat', products: this.generateProducts(1,"Coat") },
//     { name: 'Jeans', products: this.generateProducts(3,"Jeans") },
//     { name: 'Jacket', products: this.generateProducts(1,"Jacket") },
//     { name: 'Dress', products: this.generateProducts(1,"Dress") }
//   ];
//   filteredProducts: any[] = [];

//   swiperReady() {
//     this.swiper = this.swiperRef?.nativeElement.swiper;
//   }

//   swiperSlideChanged(e: any) {
//     const index = e.target.swiper.activeIndex
//     this.selectedSegment = this.segmentList[index]
//   }

//   _segmentSelected(index: number) {
//     this.swiper?.slideTo(index)
//   }

//   selectCategory(categoryName: string) {
//     this.selectedSegment = categoryName;
//     if (categoryName === 'All') {
//       this.filteredProducts = [].concat(...this.categories.map(category => category.products));
//     } else {
//       const selectedCategory = this.categories.find(category => category.name === categoryName);
//       this.filteredProducts = selectedCategory ? selectedCategory.products : [];
//     }
//   }

//   generateProducts(count: number,category:string): any[] {
//     const products = [];
//     for (let i = 1; i <= count; i++) {
//       const price=Math.floor(Math.random() * 100);
//       const sold=Math.floor(Math.random() * 100);
//       const newPrice=price*sold/100;
//       products.push({
//         category: `${category}`,
//         name: `Product ${i}`,
//         imageUrl: `assets/products/${i}.png`,
//         price: `$${price}`,
//         newPrice: `$${newPrice}`,
//         sold: sold,
//         rating: (Math.random() * 5).toFixed(1)
//       });
//     }
//     return products;
//   }

//   searchQuery: string = '';

//   constructor(private navCtrl: NavController,private router: Router) { }

//   ngOnInit(): void {
//   }

//   goBack() {
//     this.router.navigateByUrl('/');
//   }

//   searchProducts(event: any) {
//     // Implement your search logic here
//     console.log('Searching products for:', this.searchQuery);
//   }

//   openLogin() {
//     this.router.navigateByUrl('/login');
//   }
// }
