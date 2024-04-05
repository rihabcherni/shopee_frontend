import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditProfileModalComponent } from '../edit-profile-modal/edit-profile-modal.component';
import { SellerService } from 'src/app/services/seller/seller.service';

// Define an interface for item
interface Item {
  title: string;
  icon: string;
  background?: string; // Make background property optional
  color?: string; // Make color property optional
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  seller: any = {};

  constructor(private sellerService: SellerService, private modalController: ModalController) {}

  ngOnInit() {
    this.seller = this.sellerService.getSellerInfo();
  }

  async editProfile() {
    const modal = await this.modalController.create({
      component: EditProfileModalComponent,
      componentProps: { seller: this.seller },
      cssClass: 'edit-profile-modal'
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.updatedSellerInfo) {
      this.seller = data.updatedSellerInfo;
      this.sellerService.updateSellerInfo(data.updatedSellerInfo);
    }
  }

  // Define the getRows method here
  getRows(): Item[][] {
    // Example implementation, replace this with your actual logic
    return [
      [{ title: 'Option 1', icon: 'options' }, { title: 'Option 2', icon: 'options' }, { title: 'Option 3', icon: 'options' }],
      [{ title: 'Option 4', icon: 'options' }, { title: 'Option 5', icon: 'options' }, { title: 'Option 6', icon: 'options' }]
    ];
  }
}
