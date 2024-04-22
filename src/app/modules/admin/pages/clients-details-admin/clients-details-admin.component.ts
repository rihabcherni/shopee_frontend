import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ClientListService } from 'src/app/services/client/client-list.service';

@Component({
  selector: 'app-clients-details-admin',
  templateUrl: './clients-details-admin.component.html',
  styleUrls: ['./clients-details-admin.component.scss'],
})
export class ClientsDetailsAdminComponent  implements OnInit {
  clientId: number | undefined ;
  client: Client = {
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
    private alertService: AlertService,
    private clientService: ClientListService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clientId = params['id'];
      this.getClientById(this.clientId?? 0);
    });
  }

  getClientById(id: number): void {
    this.clientService.getUserById(id)
      .subscribe(
        (data: Client) => {
          this.client = data;
        },
        (error: any) => {
          console.error('Error fetching client:', error);
        }
      );
  }

  updateClient(id: number | undefined) {
    if (this.clientId && this.client) {
      const updatedClientData: Partial<Client> = {
        first_name: this.client.first_name,
        last_name: this.client.last_name,
        email: this.client.email,
        phone_number: this.client.phone_number,
        date_of_birth: this.client.date_of_birth,
        address: this.client.address,
      };
      this.clientService
        .updateClient(this.clientId, updatedClientData)
        .subscribe((updatedClient) => {
          this.alertService.presentAlert('Update successfully.', `Client created successfully`, 'success-alert','assets/success.png');
          console.log('Client updated successfully:', updatedClient);
        },
        (error) => {
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
          this.alertService.presentAlert('Error updating client.', `Failed to update client: ${errorMessage}`, 'failed-alert','assets/error.png');
        }
      );
    }
  }
}

