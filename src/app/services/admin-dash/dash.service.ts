import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminCount } from 'src/app/models/AdminCount';

@Injectable({
  providedIn: 'root'
})
export class DashService {
  private apiUrl = 'http://127.0.0.1:8000/api/dash/admin-count/';

  constructor(private http: HttpClient) { }

  getAdminCount(): Observable<AdminCount> {
    return this.http.get<AdminCount>(this.apiUrl);
  }
}
