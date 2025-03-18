import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {DemoMaterialModule} from './material-module';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ManufactureComponent } from './manufacture/manufacture.component';
import { PatientComponent } from './patient/patient.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
ManufactureComponent,
    PatientComponent,
    SnackbarComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    MatRadioModule,
    MatStepperModule,
   MatButtonModule,
   MatSelectModule,
   MatInputModule,
   MatFormFieldModule,
   MatTableModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
