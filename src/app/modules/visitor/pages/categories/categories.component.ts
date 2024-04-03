import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/Category';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoriesService, private router: Router) { }

  goToSubcategories(categoryId: number): void {
    this.router.navigate([`/category/${categoryId}/subcategories`]);
  }
  ngOnInit() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
}
