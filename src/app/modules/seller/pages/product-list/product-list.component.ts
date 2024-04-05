// product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductDetailsModalComponent } from '../../components/product-details-modal/product-details-modal.component';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchTerm: string = '';

  constructor(
    private modalController: ModalController,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productService.products$.subscribe(products => {
      this.products = products;
      this.filteredProducts = this.products;
    });
  }

  async viewDetails(product: any) {
    const modal = await this.modalController.create({
      component: ProductDetailsModalComponent,
      componentProps: { product },
      cssClass: 'product-details-modal'
    });

    await modal.present();
  }

  deleteProduct(productId: number) {
    const index = this.products.findIndex(product => product.id === productId);
    if (index !== -1) {
      this.products.splice(index, 1); // Remove the product at the found index
      console.log('Product deleted with ID:', productId);
    } else {
      console.error('Product with ID:', productId, 'not found.');
    }
  }

  filterProducts() {
    if (this.searchTerm.trim() === '') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
