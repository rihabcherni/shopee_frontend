import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {
  private apiUrl = 'http://127.0.0.1:8000/api/products/categories/';

  constructor(private http: HttpClient) { }

  getSubcategories(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}${categoryId}`).pipe(
      catchError(error => {
        console.error('Error fetching subcategories:', error);
        throw error;
      })
    );
  }
}
