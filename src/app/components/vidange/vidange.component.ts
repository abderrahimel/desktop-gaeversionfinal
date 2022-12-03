import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { loadassurance } from 'src/app/state/assurance/assurance.actions';
import { AssuranceState } from 'src/app/state/assurance/assurance.state';
import { getVehicules } from 'src/app/state/vehicule/vehicule.selector';
import { VehiculeState } from 'src/app/state/vehicule/vehicule.state';
import { loadvidange } from 'src/app/state/vidange/vidange.actions';
import { VidangeState } from 'src/app/state/vidange/vidange.state';
import { loadvisiteTechnique } from 'src/app/state/visiteTechnique/visiteTechnique.actions';
import { VisiteTechniqueState } from 'src/app/state/visiteTechnique/visiteTechnique.state';

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
  day:any;
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
              private store: Store<{visiteTechnique:VisiteTechniqueState, vidange:VidangeState, assurance:AssuranceState}>
    ) {
     }

  ngOnInit(): void {
    var today = new Date();
    var dd = String(today. getDate()). padStart(2, '0');
    var mm = String(today. getMonth() + 1). padStart(2, '0'); 
    var yyyy = today. getFullYear();
    this.day = yyyy + '-' + mm + '-' + dd ;
    this.getVisiteTechnique();
    this.getVidange();
    this.getAssurance();
  }
  getVisiteTechnique(){
  this.store.pipe(take(1)).subscribe(store=>{
    if(!store.visiteTechnique.visiteTechnique.loaded){
      this.store.dispatch(loadvisiteTechnique({idAuto: localStorage.getItem('autoEcole_id')}));
    }
    this.store.select(state=>state.visiteTechnique.visiteTechnique.visiteTechnique).subscribe(visitetechnique=>{
      this.visiteTechniques = visitetechnique;
      this.dataSource= new MatTableDataSource(this.visiteTechniques)
      this.dataSource.paginator = this.paginatorFirst;
      this.dataSource.sort = this.empTbSort;
    })
  })
    // this.dataService.getVisiteTechnique(localStorage.getItem('autoEcole_id')).subscribe(vt=>{
    //       this.visiteTechniques = JSON.parse(vt);
    //       this.dataSource= new MatTableDataSource(this.visiteTechniques)
    //       this.dataSource.paginator = this.paginatorFirst;
    //       this.dataSource.sort = this.empTbSort;
    // })
  }
  getVidange(){
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.vidange.vidange.loaded){
        this.store.dispatch(loadvidange({idAuto: localStorage.getItem('autoEcole_id')}));
      }
      this.store.select(state=>state.vidange.vidange.vidange).subscribe(vidange=>{
        this.vidanges = vidange;
        this.dataSource1= new MatTableDataSource(this.vidanges)
        this.dataSource1.paginator = this.paginatorSecond;
        this.dataSource1.sort = this.empTbSort1;
      })
    })
//     this.dataService.getVidange(localStorage.getItem('autoEcole_id')).subscribe(v=>{
//       this.vidanges = JSON.parse(v);
//       this.dataSource1= new MatTableDataSource(this.vidanges)
//       this.dataSource1.paginator = this.paginatorSecond;
//       this.dataSource1.sort = this.empTbSort1;
// })
  }
  getAssurance(){
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.assurance.assurance.loaded){
        this.store.dispatch(loadassurance({idAuto: localStorage.getItem('autoEcole_id')}));
      }
      this.store.select(state=>state.assurance.assurance.assurance).subscribe(assurance=>{
        this.assurances = assurance;
        this.dataSource2= new MatTableDataSource(this.assurances)
        this.dataSource2.paginator = this.paginator2;
        this.dataSource2.sort = this.empTbSort2;
      })
    })
//     this.dataService.getAssurance(localStorage.getItem('autoEcole_id')).subscribe(assurance=>{
//       this.assurances = JSON.parse(assurance);
//       this.dataSource2= new MatTableDataSource(this.assurances)
//       this.dataSource2.paginator = this.paginator2;
//       this.dataSource2.sort = this.empTbSort2;
// })
  }
  applyFilter(event:any){
    let value = event.target.value
    this.dataSource.filter = value.trim().toLowerCase()
  }
  applyFilter1(event:any){
    let value = event.target.value
    this.dataSource1.filter = value.trim().toLowerCase()
  }
  applyFilter2(event:any){
    let value = event.target.value
    this.dataSource2.filter = value.trim().toLowerCase()
  }

}
