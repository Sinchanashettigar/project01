

import { Component, OnInit } from '@angular/core';
import { ManufactureService } from '../services/manufacture.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  manufacturers: any[] = [];
  expandedRow: any = null;
  isEditing = false;

  id:string | null = null;

  constructor(
    private manufactureService: ManufactureService,
    private router: Router,
    private snackBar: MatSnackBar, 
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getManufacturerInfo();
      console.log("this is the id : ",this.id)
    });

  }

  getManufacturerInfo() {
    this.manufactureService.getManufacturerById(this.id!).subscribe(data => {
      this.expandedRow = data;
    });
  }

  enableEditing(): void {
    this.isEditing = true;
  }

  saveChanges(): void {
    this.isEditing = false;
    const updatedData = this.expandedRow;
    console.log('Saving:', updatedData);

    if (updatedData && updatedData._id) {
      this.manufactureService.updateManufacture(updatedData._id, updatedData)
        .subscribe({
          next: (response) => {
            console.log('Update successful:', response);
            this.snackBar.open('Manufacturer updated successfully!', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-success'],
           
            });

           
            const index = this.manufacturers.findIndex(m => m._id === updatedData._id);
            if (index > -1) {
              this.manufacturers[index] = { ...updatedData };
              this.expandedRow = this.manufacturers[index];
            }

            
            setTimeout(() => this.router.navigate(['/manufacture-details']), 500);
          },
          error: (err) => {
            console.error('Update failed:', err);
            this.snackBar.open('Failed to update manufacturer.', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-error'],
             
            });
          }
        });
    } else {
      this.snackBar.open('Manufacturer ID is missing. Cannot update.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error'],
       
      });
    }
  }
}
