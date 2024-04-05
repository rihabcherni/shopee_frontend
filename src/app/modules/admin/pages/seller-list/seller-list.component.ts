import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html',
  styleUrls: ['./seller-list.component.scss'],
})
export class SellerListComponent   {
  public alertButtons = ['ADD'];
  public alertInputs = [
    {
      placeholder: 'First Name',
    },
    {
      placeholder: 'Last Name',
      // attributes: {
      //   maxlength: 8,
      // },
    },
    {
      placeholder: 'Email',
    },
    {
      placeholder: 'Phone Number',
    },
    {
      placeholder: 'Address',
    },
   
    
  ];

  sellers: any[] = [
    {id: 1, nom: 'Ben Amor',prenom:'Ranim', photo: 'assets/seller2.png',email:'BenAmorRanim@gmail.com', phone_nbr:'22065310'},
    {id: 2, nom: 'Arfaoui',prenom:'Oumayma', photo: 'assets/seller3.png',email:'ArfaouiOumayma@gmail.com', phone_nbr:'52810360'},
    {id: 3, nom: 'Salhi',prenom:'Ahmed', photo: 'assets/seller1.png',email:'SalhiAhmed@gmail.com', phone_nbr:'91232122'},
    {id: 4, nom: 'Baklouti',prenom:'Mohammed Amin', photo: 'assets/seller4.png',email:'BakloutiMedAmin@gmail.com', phone_nbr:'258107'},
  ];

  constructor(private router: Router) {}

  onSelectSeller(sellerId: number) {
    this.router.navigate([`/admin/seller-details/${sellerId}`]);  }


}
