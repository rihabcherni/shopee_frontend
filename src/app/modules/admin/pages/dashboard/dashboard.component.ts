import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  features: any[] = [
    {id: 1, name: 'Clients', src: 'assets/customer-review.png', background: 'rgba(27,150,181, 0.1)',nbr:'1500', page: ''},
    {id: 2, name: 'Sellers', src: 'assets/seller.png', background: 'rgba(106,100,255, 0.1)',nbr:'200', page: ''},
    {id: 3, name: 'Products', src: 'assets/products.png', background: 'rgba(255, 196, 9, 0.1)',nbr:'5150', page: ''},
    {id: 4, name: 'Orders', src: 'assets/free-shopping.png', background: 'rgba(27,150,181, 0.1)',nbr:'4715', page: ''},
  ];

  transactions: any[] = [
    {id: 1, name: 'Fashion', image: 'assets/brand.png'},
    {id: 2, name: 'Home & kitchen', image: 'assets/house-decoration.png'},
    {id: 3, name: 'Electronics', image: 'assets/electric-appliance.png'},

    {id: 4, name: 'Books & Media', image: 'assets/books.png'},
    {id: 5, name: 'sports equipment', image: 'assets/fitness.png'},

  ];

  constructor() { }
 

  

}
