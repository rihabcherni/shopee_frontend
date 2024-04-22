import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Client } from 'src/app/models/Client';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ClientListService } from 'src/app/services/client/client-list.service';

@Component({
  selector: 'app-clients-admin-list',
  templateUrl: './clients-admin-list.component.html',
  styleUrls: ['./clients-admin-list.component.scss'],
})
export class ClientsAdminListComponent  implements OnInit {
  public alertButtons = ['ADD'];

  clients: Client[] = [];

  constructor(
    private clientService: ClientListService,
    private alertService: AlertService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.clientService.getClients()
      .subscribe((data: Client[]) => {
        this.clients = data;
      });
  }

  onSelectClient(clientId: number) {
    this.router.navigate([`/admin/client-details/${clientId}`]);
  }

  createUser(userData: any) {
    this.clientService.createUser(userData).subscribe(
      response => {
        this.alertService.presentAlert('Add successful.', `Client created successfully:${response.first_name} ${response.last_name}`, 'success-alert','assets/success.png');
      },
      error => {
        console.error('Error creating user:', error);
        let errorMessage = 'Error Add. Can\'t add client.';
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

  removeClient(clientId: number) {
    if (confirm('Are you sure you want to remove this client?')) {
      this.clientService.removeClient(clientId).subscribe(
        () => {
          this.clients = this.clients.filter(client => client.id !== clientId);
          console.log('Client removed successfully.');
        },
        error => {
          console.error('Error removing client:', error);
        }
      );
    }
  }

  async presentAlertAddClient() {
    const alert = await this.alertController.create({
      header: "Client's infos",
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
            const userData: Client = {
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
