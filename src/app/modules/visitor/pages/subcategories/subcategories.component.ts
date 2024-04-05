import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Category } from 'src/app/models/Category';
import { SubcategoriesService } from 'src/app/services/subcategories/subcategories.service';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.scss'],
})
export class SubcategoriesComponent  implements OnInit {
  categories!: Category;

  constructor(private navCtrl: NavController,private route: ActivatedRoute, private router: Router, private subCategoriesService: SubcategoriesService) { }
  goToSubcategoriesProduct(categoryId: number, subcategoryId: number) {
    this.router.navigate([`/store/category/${categoryId}/subcategories/${subcategoryId}/products`]);
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const categoryId = params['id'];
      this.subCategoriesService.getSubcategories(categoryId).subscribe((category: Category) => {
        this.categories = category;
      });
    });
  }

  goBackToLatestPage() {
    this.navCtrl.back();
  }

}

