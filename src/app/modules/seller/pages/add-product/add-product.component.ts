import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  newProduct: any = {}; // Object to hold the new product data

  constructor(private router: Router, private productService: ProductService) {} // Inject ProductService

  saveProduct() {
    console.log('New Product:', this.newProduct);
    // Create a new object for each new product being added
    const newProductCopy = { ...this.newProduct };
    this.productService.addProduct(newProductCopy);
    this.router.navigate(['/seller/products-list']);
  }
}
