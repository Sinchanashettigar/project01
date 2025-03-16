import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import {  ManufactureComponent  } from  './manufacture/manufacture.component';
 import { PatientComponent } from './patient/patient.component';
const routes: Routes = [
  {
     path:'manufacture',component:ManufactureComponent
   },
  {
    path:'patient',component:PatientComponent
   },
   {
    path:'',redirectTo:'/manufacture', pathMatch:'full'
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
