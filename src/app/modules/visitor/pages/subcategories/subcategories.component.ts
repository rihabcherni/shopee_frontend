import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/Category';
import { SubcategoriesService } from 'src/app/services/subcategories/subcategories.service';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.scss'],
})
export class SubcategoriesComponent  implements OnInit {
  categories: Category[] = [];

  constructor(private route: ActivatedRoute, private subCategoriesService: SubcategoriesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const categoryId = params['id'];
      this.subCategoriesService.getSubcategories(categoryId).subscribe(category => {
        this.categories = [category as unknown as Category];
        console.log(category)
      });
    });
  }


}



