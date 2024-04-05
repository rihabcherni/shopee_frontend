import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { ConferenceData } from '../../providers/conference-data';
@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html',
  styleUrls: ['./seller-details.component.scss'],
})
export class SellerDetailsComponent  {

  sellerId: number | undefined;
  seller: any; 

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.sellerId = params['id'];
      // this.seller = this.getSellerDetails(this.sellerId); // Implement this method
    });
  }

  private getSellerDetails(sellerId: number) {
    return { id: sellerId, name: 'Example Seller', otherDetails: '...' };
  }

}
