import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface UserData {
  first_name: string;
  last_name: string;
  gender: string;
  phone_number: string;
  id: string;
  dob: string;
  email?: string;
  bloodgroup?: string;
  address?: {
    street: string;
    city: string;
    postal_code: string;
    country: string;
    
  };
}
@Component({
  selector: 'app-detailsrecipient',
  templateUrl: './detailsrecipient.component.html',
  styleUrls: ['./detailsrecipient.component.css']
})
export class DetailsrecipientComponent implements OnInit {
  expandedRow: any = null;
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
  
  if (navigation?.extras.state?.['data']) {
    this.expandedRow = navigation.extras.state['data'];
    console.log('Received Data:', this.expandedRow);
  } 
  // else
  //  {
  //   console.warn('No data received, navigating back.');
  //   this.router.navigate(['/previous-route']); 
  // }
   }

  ngOnInit(): void {
  }
toggleRow(row: UserData) {
   
    console.log('Selected row:', row);

    this.expandedRow = this.expandedRow === row ? null : row;
    console.log('Expanded row set to:', this.expandedRow);
  }
}
