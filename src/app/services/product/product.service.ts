import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject = new BehaviorSubject<any[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor() {}

  get products(): any[] {
    return this.productsSubject.value;
  }

  addProduct(product: any) {
    const currentProducts = this.productsSubject.value;
    const updatedProducts = [...currentProducts, product];
    this.productsSubject.next(updatedProducts);
  }
}
