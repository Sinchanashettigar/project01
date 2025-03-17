import { Component,ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  ValidationErrors,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import * as countryCodes from 'country-codes-list';
import { Country, State, City } from 'country-state-city';
import { APIService } from '../api.service';
import {MatSnackBar} from '@angular/material/snack-bar'
@Component({
  selector: 'app-root',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  encapsulation: ViewEncapsulation.None, 
})
export class PatientComponent {
  title = 'demo';

  myForm: FormGroup;

  isLinear = true;
  
  height: string = '';
  weight: number = 0;
  myCountryCodesObject: {
    countryCode: string;
    countryNameEn: string;
    countryCallingCode: string;
  }[] = [];
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];

  selectedCountry: string | null = null;
  selectedState: string | null = null;
  stateSelectedWithoutCountry: boolean = false;

  constructor(private fb: FormBuilder, private apiService: APIService,private _snackBar: MatSnackBar) {}
  ngOnInit() {
    this.initializeForm();
    this.loadCountryCodes();
    this.countries = Country.getAllCountries();
    this.states = State.getStatesOfCountry();
  }

  initializeForm() {
    this.myForm = this.fb.group({
      first_name: ['', [Validators.required, this.customValidator]],
      last_name: ['', [Validators.required, this.customValidator]],
      gender: ['', [Validators.required]],
      dob: ['', [Validators.required, this.futureDateValidator]],
      id: ['', [Validators.required, this.idValidator]],
      countryCode: ['+91', Validators.required],
      phone_number: ['', [Validators.required, this.phoneNumberValidator]],
      email: ['', [Validators.required, this.emailValidator]],

      bloodgroup: ['', [Validators.required]],
      Address:['',[Validators.required]],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postal_code: ['', Validators.required],
      country: ['', Validators.required],
      hasChronicIllness: [''],
      chronicIllnessDetails: [''],
      hasAllergies: [''],
      allergyDetails: [''],
      hasmedications: [''],
      medicationsDetails: [''],
      hasillnesses: [''],
      illnessesDetails: [''],
      hasPhysicalDisabilities: [''],
      mentalhealthDetails: [''],
      hassurgeries: [''],
      surgeriesDetails: [''],
      hashospitalized: [''],
      hospitalizedDetais: [''],
      hasmedicalconditions: [''],
      medicalconditionsDetails: [''],
      hasDietaryRestrictions:['']
    });
  }
  onSubmit() {
    console.log('Form submitted!', this.myForm.value);
  
    this.apiService.postData(this.myForm.value).subscribe({
      next: (response) => {
        console.log('API Response:', response); 
        if (response?.status === 'auth-01') {
          this._snackBar.open('✔ Submitted successfully', 'Done', { duration: 5000 });
          console.log('Added successfully');
        } else {
          this._snackBar.open('Submission failed. Please try again.', 'OK', { duration: 5000 });
          console.log('Failed');
        }
      },
      error: (err) => {
        console.error('API Error:', err);
        this._snackBar.open('Error occurred. Please try again.', 'OK', { duration: 5000 });
      }
    });
  }
  


  customValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    let errors: any = {};

    if (value && /\d/.test(value)) {
      errors.invalidInput = 'No Numbers are allowed';
    }
    if (value && /[^\w\s]/.test(value)) {
      errors.specialChars = 'No special characters allowed';
    }
    if (value && !/^[A-Z]/.test(value)) {
      errors.firstLetter = 'First letter must be uppercase';
    }
    return Object.keys(errors).length ? errors : null;
  }
  //date validation//

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const today = new Date();
   
    const selectedDate = new Date(control.value);

    return selectedDate > today
      ? { futureDate: 'date cannot be in future' }
      : null;
  }

  //country code

  private loadCountryCodes() {
    const rawCountryData = countryCodes.customList(
      'countryCode',
      '{countryCode},{countryNameEn},{countryCallingCode}'
    );
    this.myCountryCodesObject = Object.keys(rawCountryData).map((key) => {
      const [countryCode, countryNameEn, countryCallingCode] =
        rawCountryData[key].split(',');
      return { countryCode, countryNameEn, countryCallingCode };
    });
  }
  onCountryCodeChange(event: any) {
    const selectedCode = event.value;
    let currentValue = this.myForm.get('phoneNumber')?.value || '';

    if (!currentValue.startsWith(`+${selectedCode}`)) {
      currentValue = `+${selectedCode} ${currentValue.replace(
        /^\+\d+\s*/,
        ''
      )}`;
    }
    this.myForm.patchValue({ phoneNumber: currentValue });

    //phone number
  }
  phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value ? control.value.replace(/^\+\d+\s*/, '') : '';

    let errors: ValidationErrors = {};

    if (!value) return { required: true };

    if (!/^\d+$/.test(value)) {
      errors.invalidCharacters = 'Only numbers are allowed';
    }
    if (value.length !== 10) {
      errors.invalidLength = 'Phone number must be 10 digits';
    }

    return Object.keys(errors).length ? errors : null;
  }

  ///email

  emailValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    const valid = emailRegex.test(control.value);
    return valid ? null : { invalidEmailFormat: true };
  }

  idValidator(control: AbstractControl): ValidationErrors | null {
    const id: string = control.value;

    if (!id) {
      return { required: true };
    }

    if (id.length < 6 || id.length > 12) {
      return { invalidLength: true };
    }

    return null;
  }

  onCountryChange(countryCode: string) {
    if (countryCode) {
      this.selectedCountry = countryCode;

      this.states = State.getStatesOfCountry(countryCode);
      this.myForm.get('state')?.enable();
      this.myForm.get('state')?.reset();
    }
  }

  onStateChange(stateCode: string) {
    const countryCode = this.myForm.get('country')?.value;

    if (!countryCode) {
      this.stateSelectedWithoutCountry = true;
      this.myForm.get('state')?.reset();
      return;
    } else {
      this.stateSelectedWithoutCountry = false;
    }

    this.selectedState = stateCode;

    this.cities = City.getCitiesOfState(countryCode, stateCode);
    this.myForm.get('city')?.enable();
    this.myForm.get('city')?.reset();
  }
  // onHeightWeightChange(event: any) {
  //   const value = event.target.value;
  //   const regex = /(\d+)\s*cm.*?(\d+)\s*kg/;
  //   const match = value.match(regex);
  //   if (match) {
  //     this.myForm.patchValue({
  //       height: match[1],
  //       weight: match[2],
  //     });
  //   }
  // }
  onHeightChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.height =target.value.replace(/\D/g, ''); // Remove non-numeric characters
    console.log('Height:', this.height);
  }
  
  onWeightChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const numericValue = target.value.replace(/\D/g, ''); // Ensure only numeric values
  
    this.weight = numericValue ? Number(numericValue) : 0; // Convert to number
    console.log('Weight:', this.weight);
  }
  
  
}
