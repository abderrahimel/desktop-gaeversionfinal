import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-archive-auto-ecole',
  templateUrl: './archive-auto-ecole.component.html',
  styleUrls: ['./archive-auto-ecole.component.css']
}) 
export class ArchiveAutoEcoleComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['nom_auto_ecole', 'nom_responsable', 'etat', 'telephone', 'tel_responsable', 'pays', 'actions'];    
  dataSource!: MatTableDataSource<any>;
  posts:any;
  n:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataLoad:any;
  dateVal = new Date();
  constructor(private dataService:DataService,
               private auth:AuthService
    ) { }

  ngOnInit(): void {
      this.auth.authStatus.subscribe(value=>{
        if(value){
          this.getArchiveAutoEcole();
        }
      })
    // this.getData();
  }
  getArchiveAutoEcole(){
    this.dataService.getArchiveAutoEcole().subscribe(data =>{
      this.dataLoad = data;
      this.dataSource = new MatTableDataSource(this.dataLoad)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.n = this.dataLoad.reduce((acc, o) => acc + Object.keys(o).length, 0)
    })
  }

  ngAfterViewInit() {
   }

applyFilter(event:any){
  let value = event.target.value
  this.dataSource.filter = value.trim().toLowerCase()
}
  recuperAutoEcole(id:any){
    Swal.fire({
      title: 'confirmation',
      text: "Vous voulez vraiment confirmer la recuperation!",
      icon: 'error',
      showCancelButton: true,
      cancelButtonText: 'annuler',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'oui, recuper'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.recuperAutoEcole(id).subscribe(data =>{
          this.getArchiveAutoEcole();
         })
      }
    })
    
  }
}
