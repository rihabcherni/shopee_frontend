import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subcategory } from 'src/app/models/Subcategory';
import { ProductStoreService } from 'src/app/services/product-store/product-store.service';
import { formatDiscount } from 'src/app/utilities';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent  implements OnInit {
  subcategoriesProducts!: Subcategory;

  constructor(private navCtrl: NavController,private route: ActivatedRoute,
    private router: Router,
    private subCategoriesService: ProductStoreService) { }
  goToSubcategoriesProduct(categoryId: number, subcategoryId: number) {
    this.router.navigate([`/store/category/${categoryId}/subcategories/${subcategoryId}/products`]);
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const categoryId = params['subcategory'];
      this.subCategoriesService.getSubcategories(categoryId).subscribe((category: Subcategory) => {
        this.subcategoriesProducts = category;
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
    return formatDiscount(discount);
  }
}

