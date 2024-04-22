import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Seller } from 'src/app/models/Seller';
import { SellerListService } from 'src/app/services/seller/seller-list.service';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html',
  styleUrls: ['./seller-list.component.scss'],
})
export class SellerListComponent implements OnInit {
  public alertButtons = ['ADD'];

  sellers: Seller[] = [];

  constructor(
    private sellerService: SellerListService,
    private alertService: AlertService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit(): void {
    this.getSellers();
  }

  getSellers(): void {
    this.sellerService.getSellers()
      .subscribe((data: Seller[]) => {
        this.sellers = data;
      });
  }

  onSelectSeller(sellerId: number) {
    this.router.navigate([`/admin/seller-details/${sellerId}`]);
  }

  createUser(userData: any) {
    this.sellerService.createUser(userData).subscribe(
      response => {
        this.alertService.presentAlert('Add successfully.', `Seller created successfully:${response.first_name} ${response.last_name}`, 'success-alert','assets/success.png');
      },
      error => {
        console.error('Error creating user:', error);
        let errorMessage = 'Error Add. Can\'t add seller.';
        if (error.error) {
          if (error.error.email) {
            errorMessage += ` <br><b>Email</b>: ${error.error.email.join(' ')}`;
          }
          if (error.error.first_name) {
            errorMessage += ` <br><b>FirstName</b>: ${error.error.first_name.join(' ')}`;
          }
          if (error.error.last_name) {
            errorMessage += ` <br><b>LastName</b>: ${error.error.last_name.join(' ')}`;
          }
        }
        this.alertService.presentAlert('Error Add.',errorMessage, 'failed-alert','assets/error.png');
      }
    );
  }

  removeSeller(sellerId: number) {
    if (confirm('Are you sure you want to remove this seller?')) {
      this.sellerService.removeSeller(sellerId).subscribe(
        () => {
          this.sellers = this.sellers.filter(seller => seller.id !== sellerId);
          console.log('Seller removed successfully.');
        },
        error => {
          console.error('Error removing seller:', error);
        }
      );
    }
  }

  async presentAlertAddSeller() {
    const alert = await this.alertController.create({
      header: "Seller's infos",
      inputs: [
        {
          placeholder: 'First Name',
          name: 'first_name',
          type: 'text'
        },
        {
          placeholder: 'Last Name',
          name: 'last_name',
          type: 'text'
        },
        {
          placeholder: 'Email',
          name: 'email',
          type: 'email'
        },
        {
          placeholder: 'Phone Number',
          name: 'phone_number',
          type: 'tel'
        },
        {
          placeholder: 'Address',
          name: 'address',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'ADD',
          handler: (alertData) => {
            const userData: Seller = {
              is_verified: true,
              ...alertData
            };
            this.createUser(userData);
          }
        }
      ]
    });

    await alert.present();
  }
}
