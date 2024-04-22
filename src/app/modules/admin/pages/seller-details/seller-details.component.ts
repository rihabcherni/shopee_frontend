import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Seller } from 'src/app/models/Seller';
import { SellerListService } from 'src/app/services/seller/seller-list.service';

@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html',
  styleUrls: ['./seller-details.component.scss'],
})
export class SellerDetailsComponent implements OnInit {
  sellerId: number | undefined ;
  seller: Seller = {
    id: 0,
    is_verified: false,
    email: '',
    phone_number: null,
    first_name: '',
    last_name: '',
    photo: null,
    address: null,
    date_of_birth: null
  };

  constructor(
    private route: ActivatedRoute,
    private sellerService: SellerListService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.sellerId = params['id'];
      this.getSellerById(this.sellerId?? 0);
    });
  }

  getSellerById(id: number): void {
    this.sellerService.getUserById(id)
      .subscribe(
        (data: Seller) => {
          this.seller = data;
        },
        (error: any) => {
          console.error('Error fetching seller:', error);
        }
      );
  }

  updateSeller(id: number | undefined) {
    if (this.sellerId && this.seller) {
      const updatedSellerData: Partial<Seller> = {
        first_name: this.seller.first_name,
        last_name: this.seller.last_name,
        email: this.seller.email,
        phone_number: this.seller.phone_number,
        date_of_birth: this.seller.date_of_birth,
        address: this.seller.address,
      };
      this.sellerService
        .updateSeller(this.sellerId, updatedSellerData)
        .subscribe((updatedSeller) => {
          console.log('Seller updated successfully:', updatedSeller);
        });
    }
  }
}

