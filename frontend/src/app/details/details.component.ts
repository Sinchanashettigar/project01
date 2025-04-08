// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { ManufactureService } from '../services/manufacture.service'; 

// export interface UserData {
//   vaccine_produced: {
//     vacc_name: string;
//     vacc_type: string;
//     approval_status: string;
//     expiry_date: string;
//     production_date: string;
//     vacc_batch: string;
//     dosage_after: string;
//     dosage_before: string;
//     dosage_frequency: string;
//   };
//   target_age_group: {
//     age_group_name: string;
//     minimum_age: string;
//     maximum_age: string;
//   };
//   contact_information: {
//     manufacture_name: string;
//     established_year: string;
//     contact_person_name: string;
//     email: string;
//     phone_number: string;
//   };
//   vaccine_detail: {
//     description: string;
//     dosage_instruction: string;
//   };
//   side_effects: string;
//   contraindication: string;
// }

// @Component({
//   selector: 'app-details',
//   templateUrl: './details.component.html',
//   styleUrls: ['./details.component.css']
// })
// export class DetailsComponent implements OnInit {
//   expandedRow: any = null;
//   isEditing: boolean = false;

//   constructor(
//     private router: Router,
//     private manufactureService: ManufactureService, 
//     private _snackBar: MatSnackBar
//   ) {
//     const navigation = this.router.getCurrentNavigation();
//     if (navigation?.extras.state?.['data']) {
//       this.expandedRow = navigation.extras.state['data'];
//       console.log('Received Data:', this.expandedRow);
//     }
//   }

//   ngOnInit(): void {}

//   enableEditing(): void {
//     this.isEditing = true;
//   }

//   saveChanges() {
//     console.log('Save button clicked');
//     if (!this.expandedRow?._id) return;
//     this.manufactureService.updateManufacture(this.expandedRow._id, this.expandedRow).subscribe({
//       next: (data) => {
//         console.log('Vaccine data updated:', data);
//         this._snackBar.open('Vaccine data updated successfully!', 'Close', { duration: 3000 });

//         this.isEditing = false;

//         const updatedManufacture = data || this.expandedRow;
//         this.router.navigate(['/manufacture-details'], { state: { updatedManufacture } });
//       },
//       error: (error) => {
//         console.error('Error updating vaccine:', error);
//         this._snackBar.open('Update failed. Please try again.', 'Close', { duration: 3000 });
//       }
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ManufactureService } from '../services/manufacture.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  expandedRow: any = null;
  isEditing: boolean = false;

  constructor(
    private router: Router,
    private manufactureService: ManufactureService,
    private _snackBar: MatSnackBar
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['data']) {
      this.expandedRow = navigation.extras.state['data'];
      console.log('Received Data:', this.expandedRow);
    }
  }

  ngOnInit(): void {}

  enableEditing(): void {
    this.isEditing = true;
  }

  
  saveChanges(): void {
    console.log('Save button clicked');
    console.log('Expanded Row:', this.expandedRow);
  
    const id = this.expandedRow?._id;
  
    // if (!id) {
    //   this._snackBar.open(' Record ID (_id) not found. Cannot update.', 'Close', { duration: 3000 });
    //   console.error('Missing _id in expandedRow');
    //   return;
    // }
  
    this.manufactureService.updateManufacture(id, this.expandedRow).subscribe({
      next: (data) => {
        console.log(' Vaccine data updated:', data);
        this._snackBar.open('Vaccine data updated successfully!', 'Close', { duration: 3000 });
  
        this.isEditing = false;
        const updatedManufacture = data || this.expandedRow;
        this.router.navigate(['/manufacture-details'], { state: { updatedManufacture } });
      },
      error: (error) => {
        console.error(' Error updating vaccine:', error);
        this._snackBar.open('Update failed. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }

  
}  
