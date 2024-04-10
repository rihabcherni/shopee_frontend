import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Product } from 'src/app/models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }
  private productsSubject = new BehaviorSubject<any[]>([]);
  products$ = this.productsSubject.asObservable();


  get products(): any[] {
    return this.productsSubject.value;
  }

  addProduct(product: any) {
    const currentProducts = this.productsSubject.value;
    const updatedProducts = [...currentProducts, product];
    this.productsSubject.next(updatedProducts);
  }

  private apiUrl = 'http://localhost:8000/api/products/products/';

  getProductDetails(productId: number): Observable<Product> {
    const url = `${this.apiUrl}${productId}/`;
    return this.http.get<Product>(url);
  }
}
