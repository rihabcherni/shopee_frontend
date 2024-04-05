import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  sellerInfo: any = {}; // Object to hold the seller's information

  constructor() {
    // Initialize or fetch seller's information during service initialization
    this.fetchSellerInfo();
  }

  // Method to fetch seller's information from an API or any other source
  fetchSellerInfo() {
    // Simulate fetching seller's information from an API
    // Replace this with actual API call
    this.sellerInfo = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      // Add more properties as needed
    };
  }

  // Method to get seller's information
  getSellerInfo() {
    return this.sellerInfo;
  }

  // Method to update seller's information
  updateSellerInfo(updatedInfo: any) {
    // Implement logic to update seller's information (e.g., send data to backend)
    console.log('Updated Seller Info:', updatedInfo);
    // For demonstration purposes, we'll update the local sellerInfo object
    this.sellerInfo = { ...this.sellerInfo, ...updatedInfo };
  }
}
