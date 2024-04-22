import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SellerDashCount } from 'src/app/models/SellerDashCount';

@Injectable({
  providedIn: 'root'
})
export class DashboradSellerService {
  private apiUrl = 'http://127.0.0.1:8000/api/dash/seller-count/';

  constructor(private http: HttpClient) { }

  getAdminCount(): Observable<SellerDashCount> {
    return this.http.get<SellerDashCount>(this.apiUrl);
  }
}
