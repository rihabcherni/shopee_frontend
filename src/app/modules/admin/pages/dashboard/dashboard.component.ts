import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminCount } from 'src/app/models/AdminCount';
import { Category } from 'src/app/models/Category';
import { DashService } from 'src/app/services/admin-dash/dash.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  adminCount!: AdminCount;
  features: any[] = [];

  categories: Category[] = [];

  constructor(
    private categoryService: CategoriesService,
    private adminCountService: DashService,
    private router: Router ) {
    }

  goToSubcategories(categoryId: number): void {
    console.log(categoryId);
    this.router.navigate([`/admin/category/${categoryId}/subcategories`]);
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
    this.fetchAdminCount();
  }

  fetchAdminCount() {
    this.adminCountService.getAdminCount().subscribe(
      (data: AdminCount) => {
        this.adminCount = data;
        this.updateFeaturesArray();
      },
      (error) => {
        console.error('Error fetching admin count:', error);
      }
    );
  }

  updateFeaturesArray() {
    this.features = [
      { id: 1, name: 'Clients', src: 'assets/customer-review.png', background: 'rgba(27,150,181, 0.1)', nbr: this.adminCount?.client_count || 0, page: '' },
      { id: 2, name: 'Sellers', src: 'assets/seller.png', background: 'rgba(106,100,255, 0.1)', nbr: this.adminCount?.seller_count || 0, page: '' },
      { id: 3, name: 'Products', src: 'assets/products.png', background: 'rgba(255, 196, 9, 0.1)', nbr: this.adminCount?.products_count || 0, page: '' },
      { id: 4, name: 'Orders', src: 'assets/free-shopping.png', background: 'rgba(27,150,181, 0.1)', nbr: this.adminCount?.order_count || 0, page: '' },
    ];
  }
}
