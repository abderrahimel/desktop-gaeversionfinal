import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { getVehicules } from 'src/app/state/vehicule/vehicule.selector';
import { VehiculeState } from 'src/app/state/vehicule/vehicule.state';

@Component({
  selector: 'app-vidange',
  templateUrl: './vidange.component.html',
  styleUrls: ['./vidange.component.css']
})
export class VidangeComponent implements OnInit {
  displayedColumns: string[] = ['matricule', 'type', 'marque',  'date_visite',  'date_prochain_visite',  'etat'];
  @ViewChild('empTbSort') empTbSort = new MatSort();
  @ViewChild('paginatorFirst') paginatorFirst!: MatPaginator;   
  displayedColumns1: string[] = ['matricule', 'type', 'marque',  'date_vidange',  'date_prochain_vidange',  'etat'];
  @ViewChild('empTbSort1') empTbSort1 = new MatSort();
  @ViewChild('paginatorSecond') paginatorSecond!: MatPaginator;    
  displayedColumns2: string[] =['matricule', 'type', 'marque',  'date_assurance',  'date_expiration_assurance',  'etat'];
  @ViewChild('empTbSort2') empTbSort2 = new MatSort();
  @ViewChild('paginator2') paginator2!: MatPaginator;     
  dateVal = new Date();
  message= '';
  candidat_data:any;
  current_candidat:any;
  dataLoad:any;
  id_candidat:any;
  vidanges:any;
  assuranceUrgent:any;
  vidangesUrgent:any;
  visiteTechniquesUrgent:any;
  assurances:any;
  visiteTechniques:any;
  dataSource = new MatTableDataSource();
  dataSource1 = new MatTableDataSource();
  dataSource2 = new MatTableDataSource();
  constructor(private dataService:DataService,
               private store:Store<{vehicule: VehiculeState}>,
    ) {
     }

  ngOnInit(): void {
    this.getVidanges();
  }
  applyFilter(event:any){
    let value = event.target.value
    this.dataSource.filter = value.trim().toLowerCase()
  }
  applyFilter1(event:any){
    let value = event.target.value
    this.dataSource1.filter = value.trim().toLowerCase()
  }
  deleteVidange(){
  }
  getVidanges(){
    let currentDate = new Date().getTime();
    const yesterdayTimeStamp = currentDate - 24*60*60*1000;
    const tomorrowTime = currentDate + 24*60*60*1000;
     this.dataService.getVehicules(localStorage.getItem('autoEcole_id')).subscribe(vehicules=>{
          // assurance
          this.assurances = JSON.parse(vehicules);
          this.assurances = this.assurances.filter(item => (new Date(item.date_expiration_assurance).getTime()) >= currentDate );
          this.dataSource2 = new MatTableDataSource(this.assurances)
          this.dataSource2.paginator = this.paginator2;
          this.dataSource2.sort = this.empTbSort2;
          console.log("assurance");
          console.log(this.assurances);
          this.assuranceUrgent = JSON.parse(vehicules).filter(item => (new Date(item.date_expiration_assurance).getTime()) >= yesterdayTimeStamp );
          console.log(this.assuranceUrgent);
          this.assuranceUrgent = this.assuranceUrgent.filter(item => (new Date(item.date_expiration_assurance).getTime()) <= tomorrowTime );
          console.log(this.assuranceUrgent);
          // vidanges
          this.vidanges =  JSON.parse(vehicules).filter(item => (new Date(item.date_prochain_vidange).getTime()) >= currentDate );
          this.vidangesUrgent = JSON.parse(vehicules).filter(item => (new Date(item.	date_prochain_vidange).getTime()) >= yesterdayTimeStamp );
          this.vidangesUrgent = this.vidangesUrgent.filter(item => (new Date(item.	date_prochain_vidange).getTime()) <= tomorrowTime );
          // visite technique 
          this.visiteTechniques =  JSON.parse(vehicules).filter(item => (new Date(item.date_prochain_visite).getTime()) >= currentDate );
          this.visiteTechniquesUrgent = JSON.parse(vehicules).filter(item => (new Date(item.date_prochain_visite).getTime()) >= yesterdayTimeStamp );
          this.visiteTechniquesUrgent = this.visiteTechniquesUrgent.filter(item => (new Date(item.date_prochain_visite).getTime()) <= tomorrowTime );

     })
  }
}
