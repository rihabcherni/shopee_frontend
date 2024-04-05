import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from 'src/app/models/Category';
import { Subcategory } from 'src/app/models/Subcategory';

@Injectable({
  providedIn: 'root'
})
export class ProductStoreService {
  private apiUrl = 'http://127.0.0.1:8000/api/products/subcategories/';

  constructor(private http: HttpClient) { }

  getSubcategories(subcategoryId: number): Observable<Subcategory> {
    return this.http.get<Subcategory>(`${this.apiUrl}${subcategoryId}`).pipe(
      catchError(error => {
        console.error('Error fetching subcategories:', error);
        throw error;
      })
    );
  }
}
