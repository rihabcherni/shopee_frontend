import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Seller } from 'src/app/models/Seller';

@Injectable({
  providedIn: 'root'
})
export class SellerListService {

  private apiUrl = 'http://localhost:8000/api/auth/sellers/';
  private apiUrl2 = 'http://localhost:8000/api/auth/user/';
  private apiUrl3 = 'http://localhost:8000/api/auth/create-seller/';

  constructor(private http: HttpClient) { }


  getSellers(): Observable<Seller[]> {
    return this.http.get<Seller[]>(this.apiUrl);
  }
  getUserById(id: number): Observable<Seller> {
    return this.http.get<Seller>(`${this.apiUrl2}${id}/`);
  }

  updateSeller(sellerId: number, updatedSellerData: Partial<Seller>): Observable<Seller> {
    const url = `${this.apiUrl2}${sellerId}/`;
    return this.http.put<Seller>(url, updatedSellerData);
  }

  createUser(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl3, userData);
  }
  removeSeller(sellerId: number): Observable<any> {
    const url = `${this.apiUrl2}${sellerId}/`;
    return this.http.delete(url);
  }
}
