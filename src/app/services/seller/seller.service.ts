import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  sellerInfo: any = {};

  constructor() {
    this.fetchSellerInfo();
  }

  fetchSellerInfo() {
    this.sellerInfo = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
    };
  }
  getSellerInfo() {
    return this.sellerInfo;
  }
  updateSellerInfo(updatedInfo: any) {
    console.log('Updated Seller Info:', updatedInfo);
    this.sellerInfo = { ...this.sellerInfo, ...updatedInfo };
  }
}
