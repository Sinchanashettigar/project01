// import { Component, OnInit } from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';
// import { FormGroup, FormControl } from '@angular/forms';


// export interface UserData{
// vaccinename: string;
// manufacturername:string;
// productiondate:string;
// expirydate:string;
// description:string;
// contraindications:string,
// shelllife:string,


// }

// @Component({
//   selector: 'app-table',
//   templateUrl: './table.component.html',
//   styleUrls: ['./table.component.css']
// })
// export class TableComponent implements OnInit {
//   myForm2: FormGroup;

//   displayedColumns: string[] = ['vaccinebatch', 'manufacturername','productiondate','expirydate','description','Contraindications','shelllife']; 

//   dataSource = new MatTableDataSource([
//     { vaccinebatch: '', manufacturername: '',  productiondate:'',expirydate:'', description:'', Contraindications:'',shelllife:''},
// ]);

//     range = new FormGroup({
//       start: new FormControl(),
//       end: new FormControl(),
//     })

//    constructor() {
//     const users= Array.from({length: 100},(_, k)=>
//     createNewUser(k+1))

//     this.dataSource= new MatTableDataSource(users);
//    }

//   ngOnInit(): void {}

//  applyFilter(event:Event){
//   const filterValue =(event.target as HTMLInputElement).value;
//   this.dataSource.filter =filterValue.trim().toLowerCase();


//   if(this.dataSource.paginator){
//     this.dataSource.paginator.firstPage();
//   }



//  }

// }
// import { Component, OnInit, ViewChild } from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';
// import { FormGroup, FormControl } from '@angular/forms';
// import { MatPaginator } from '@angular/material/paginator';

// export interface UserData {
//   vaccinebatch: string;
//   manufacturername: string;
//   productiondate: string;
//   expirydate: string;
//   description: string;
//   Contraindications: string;
//   shelllife: string;
// }

// @Component({
//   selector: 'app-table',
//   templateUrl: './table.component.html',
//   styleUrls: ['./table.component.css'],
// })
// export class TableComponent implements OnInit {
//   displayedColumns: string[] = [
//     'vaccinebatch',
//     'manufacturername',
//     'productiondate',
//     'expirydate',
//     'description',
//     'Contraindications',
//     'shelllife',
//   ];

//   dataSource = new MatTableDataSource<UserData>();

//   range = new FormGroup({
//     start: new FormControl(),
//     end: new FormControl(),
//   });

//   @ViewChild(MatPaginator) paginator: MatPaginator;

//   constructor() 
//   {
//       const users = Array.from({ length: 10 }, (_, k) => 
//         this.createNewUser({
//           vaccinebatch: `Batch ${k + 1}`,
//           manufacturername: `Manufacturer ${k + 1}`,
//           productiondate: `2024-0${(k % 9) + 1}-01`,
//           expirydate: `2025-0${(k % 9) + 1}-01`,
//           description: `Description ${k + 1}`,
//           Contraindications: `None`,
//           shelllife: `6 months`
//         })
//       );
    
//       this.dataSource = new MatTableDataSource(users);
//     }
    
  

//   ngOnInit(): void {
//     this.dataSource.paginator = this.paginator;

//     // Custom filter function to apply filter across all columns
//     this.dataSource.filterPredicate = (data: UserData, filter: string) => {
//       return Object.values(data).some(value =>
//         value.toLowerCase().includes(filter)
//       );
//     };
//   }

//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
//     this.dataSource.filter = filterValue;

//     if (this.dataSource.paginator) {
//       this.dataSource.paginator.firstPage();
//     }
//   }

//   createNewUser(data: Partial<UserData>): UserData {
//     return {
//       vaccinebatch: data.vaccinebatch || '',
//       manufacturername: data.manufacturername || '',
//       productiondate: data.productiondate || '',
//       expirydate: data.expirydate || '',
//       description: data.description || '',
//       Contraindications: data.Contraindications || '',
//       shelllife: data.shelllife || '',
//     };
//   }
  
// }
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl } from '@angular/forms';

export interface UserData {
  vaccinebatch: string;
  manufacturername: string;
  productiondate: string;
  expirydate: string;
  description: string;
  Contraindications: string;
  shelllife: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  myForm2: FormGroup;

  displayedColumns: string[] = [
    'vaccinebatch', 
    'manufacturername', 
    'productiondate', 
    'expirydate', 
    'description', 
    'Contraindications', 
    'shelllife'
  ]; 

  dataSource = new MatTableDataSource<UserData>([]);

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor() {
    const users = Array.from({ length: 10 }, () => this.createNewUser({}));
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createNewUser(data: Partial<UserData>): UserData {
    return {
      vaccinebatch: data.vaccinebatch ?? this.generateRandomBatch(),
      manufacturername: data.manufacturername ?? this.generateRandomManufacturer(),
      productiondate: data.productiondate ?? this.generateRandomDate(),
      expirydate: data.expirydate ?? this.generateExpiryDate(),
      description: data.description ?? this.generateRandomDescription(),
      Contraindications: data.Contraindications ?? this.generateRandomContraindications(),
      shelllife: data.shelllife ?? this.calculateShelfLife(),
    };
  }

  generateRandomBatch(): string {
    return `Batch-${Math.floor(Math.random() * 10000)}`;
  }

  generateRandomManufacturer(): string {
    const manufacturers = [];
    return manufacturers[Math.floor(Math.random() * manufacturers.length)];
  }

  generateRandomDate(): string {
    const year = new Date().getFullYear();
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  generateExpiryDate(): string {
    const year = new Date().getFullYear() + 1;
    return `${year}-12-31`;
  }

  generateRandomDescription(): string {
    const descriptions = [];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  }

  generateRandomContraindications(): string {
    const contraindications = [];
    return contraindications[Math.floor(Math.random() * contraindications.length)];
  }

  calculateShelfLife(): string {
    return `${Math.floor(Math.random() * 12) + 6} months`;
  }
}
