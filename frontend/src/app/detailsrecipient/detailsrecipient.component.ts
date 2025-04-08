import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../services/patient.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detailsrecipient',
  templateUrl: './detailsrecipient.component.html',
  styleUrls: ['./detailsrecipient.component.css']
})
export class DetailsrecipientComponent implements OnInit {
  expandedRow: any = null;
  isEditing: boolean = false;

  medicalFields = [
    { label: 'Has Chronic Illness', key: 'hasChronicIllness' },
    { label: 'Has Allergies', key: 'hasAllergies' },
    { label: 'Allergy Details', key: 'allergyDetails' },
    { label: 'Has Medications', key: 'hasmedications' },
    { label: 'Medications Details', key: 'medicationsDetails' },
    { label: 'Has Illnesses', key: 'hasillnesses' },
    { label: 'Illnesses Details', key: 'illnessesDetails' },
    { label: 'Has Physical Disabilities', key: 'hasPhysicalDisabilities' }
  ];

  constructor(
    private router: Router,
    private patientService: PatientService,
    private _snackBar: MatSnackBar
  ) 
  {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['data']) {
      this.expandedRow = navigation.extras.state['data'];
      console.log('Received Data:', this.expandedRow);
    }
  }

  ngOnInit(): void {}

  enableEditing() {
    this.isEditing = true;
  }

  saveChanges() {
    if (!this.expandedRow?._id) return;

    this.patientService.updatePatient(this.expandedRow._id, this.expandedRow).subscribe({
      next: (data) => {
        console.log('Patient data updated:', data);
        this._snackBar.open('Patient data updated successfully!', 'Close', { duration: 3000 });

        this.isEditing = false;

        const updatedPatient = data?.updatedPatient || this.expandedRow;
        this.router.navigate(['/recipient-details'], { state: { updatedPatient } });
      },
      error: (error) => {
        console.error('Error updating patient:', error);
        this._snackBar.open('Update failed. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }
}
