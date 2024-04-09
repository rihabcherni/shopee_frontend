import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  private apiUrl = 'http://127.0.0.1:8000/api/auth/';

  login(email: string, password: string) {
    return this.http.post<any>(this.apiUrl+'login/', { email, password });
  }

  register(first_name: string, last_name: string, email: string, password: string, password2: string, type_user: string): Observable<any> {
    return this.http.post<any>(this.apiUrl+'register/', { first_name, last_name, email, password, password2 ,type_user});
  }

  verifyOTP(otp: string) {
    return this.http.post<any>(this.apiUrl+'verify-email/', { otp }).toPromise();
  }
}