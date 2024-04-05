import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subcategory } from 'src/app/models/Subcategory';
import { ProductStoreService } from 'src/app/services/product-store/product-store.service';

@Component({
  selector: 'app-subcategories-products',
  templateUrl: './subcategories-products.component.html',
  styleUrls: ['./subcategories-products.component.scss'],
})
export class SubcategoriesProductsComponent  implements OnInit {
  subcategoriesProducts!: Subcategory;

  constructor(private navCtrl: NavController,private route: ActivatedRoute, private router: Router,
    private subCategoriesService: ProductStoreService) { }
  goToSubcategoriesProduct(categoryId: number, subcategoryId: number) {
    this.router.navigate([`/store/category/${categoryId}/subcategories/${subcategoryId}/products`]);
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const categoryId = params['subcategory'];
      this.subCategoriesService.getSubcategories(categoryId).subscribe((category: Subcategory) => {
        this.subcategoriesProducts = category;
        console.log(categoryId)
        console.log(this.subcategoriesProducts)
      });
    });
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
}

