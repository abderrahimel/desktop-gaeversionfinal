import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import * as _ from 'lodash';
import { NoteexamenModalComponent } from 'src/app/modal/noteexamen-modal/noteexamen-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailExamenComponent } from 'src/app/modal/detail-examen/detail-examen.component';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { ExamenreussiState } from 'src/app/state/examenreussi/examenreussi.state';
import { loadExamenReussiAction } from 'src/app/state/examenreussi/examenreussi.actions';
import { ExamenNoreussiState } from 'src/app/state/examenNoreussi/examenNoreussi.state';
import { loadExamenNoReussiAction } from 'src/app/state/examenNoreussi/examenNoreussi.actions';

@Component({
  selector: 'app-results-candidats',
  templateUrl: './results-candidats.component.html',
  styleUrls: ['./results-candidats.component.css']
})
export class ResultsCandidatsComponent implements OnInit {
  displayedColumns: string[] = ['cin', 'nom', 'categorie','moniteur', 'date_examen', 'actions'];
  @ViewChild('empTbSort') empTbSort = new MatSort();
  @ViewChild('paginatorFirst') paginatorFirst!: MatPaginator; 
  dataSource = new MatTableDataSource();  
  displayedColumns1: string[] = ['cin', 'nom', 'categorie','moniteur', 'date_examen', 'actions']; 
  @ViewChild('empTbSort1') empTbSort1 = new MatSort();
  @ViewChild('paginatorSecond') paginatorSecond!: MatPaginator; 
  dataSource1 = new MatTableDataSource();   
  dateVal = new Date();
  message= '';
  candidat_data:any;
  current_candidat:any;
  candidats_table1:any = [];
  candidats_table2:any = [];
  examen:any;
  moniteur:any = []
  ratrapage:boolean = false; 
  examenPratique:boolean = false; 
  ratrapageExamenPratique:boolean = false;
  resultatCandidatReussi:any;
  resultatCandidatNoReussi:any;
  vva:any;
  candidat_reussi:any;
  reussi:any;
  candidat:any;
  candidats:any;
  candidat_Notreussi:any;
  moniteurP:any;
  data_candidat:any;
  showing:boolean = false;
  isReussi:Boolean = true;
  id_candidat:any;
  idAutoEcole:any; //         
  form = new FormGroup({
    examenTheorique: new FormControl(''),
    examenPratique: new FormControl(''),
    note1: new FormControl(''),
    date_note1: new FormControl(''),
    note2: new FormControl(''),
    date_note2: new FormControl(''),
    etat_1: new FormControl(''),
    date_etat1: new FormControl(''),
    etat_2: new FormControl(''),
    date_etat2: new FormControl(''),
  });

  constructor(private dataService: DataService,
              private modalService: NgbModal,
              private store: Store<{examenreussi: ExamenreussiState, examenNoreussi: ExamenNoreussiState}>
    ) { }

  ngOnInit(): void {
   this.getExamen()
  }
  ngAfterView(){
    this.dataSource.sort = this.empTbSort;
    this.dataSource.paginator = this.paginatorFirst;
    this.dataSource1.sort = this.empTbSort1;
    this.dataSource1.paginator = this.paginatorSecond;

}
applyFilter(event:any){
  let value = event.target.value
  if(value){
    this.dataSource.filter = value.trim().toLowerCase()
  }
}
  applyFilter2(event:any){
    let value = event.target.value
    if(value){
      this.dataSource1.filter = value.trim().toLowerCase()
    }
  }
  getExamen(){
    // loadExamenReussiAction
    this.store.pipe(take(1)).subscribe(store=>{
      // load examen reussi
      if(!store.examenreussi.examenreussi.loaded){
        this.store.dispatch(loadExamenReussiAction({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
      // load examen no reussi
      if(!store.examenNoreussi.examenNoreussi.loaded){
        this.store.dispatch(loadExamenNoReussiAction({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
      // select examen reussi
      this.store.select(state=>state.examenreussi.examenreussi.examenreussi).subscribe(examenreussi=>{
          this.resultatCandidatReussi = examenreussi;
          
          this.dataSource = new MatTableDataSource(this.resultatCandidatReussi);
          this.dataSource.sort = this.empTbSort;
          this.dataSource.paginator = this.paginatorFirst;
      });
      // select examen no reussi
      this.store.select(state=> state.examenNoreussi.examenNoreussi.examenNoreussi).subscribe(examenNoreussi=>{
          this.resultatCandidatNoReussi = examenNoreussi;
          this.dataSource1 = new MatTableDataSource(this.resultatCandidatNoReussi); 
          this.dataSource1.sort = this.empTbSort1;
          this.dataSource1.paginator = this.paginatorSecond;
      })
    })
    
  }
  // getExamenNoReussi(){
  //   this.dataService.getExamenNoReussi(this.idAutoEcole).subscribe(data=>{
  //     this.resultatCandidatNoReussi = JSON.parse(data)
  //     this.dataSource1 = new MatTableDataSource(this.resultatCandidatNoReussi); 
  //     this.dataSource1.sort = this.empTbSort1;
  //     this.dataSource1.paginator = this.paginatorSecond;
  //   });
  // }
  
  getData(){
    this.idAutoEcole = localStorage.getItem('autoEcole_id');
    this.dataService.getMoniteurP(this.idAutoEcole).subscribe(data=>{
      this.moniteurP = data;
    });
  }
  deleteVidange(){

  }
  setStatus(data){
    
    if(data === 'reussi'){
      this.isReussi = true;
      this.data_candidat = this.resultatCandidatReussi;
    }else{
      this.isReussi = false;
      this.data_candidat = this.resultatCandidatNoReussi;
    }
  }

  detail(element:any){
    const modalRef = this.modalService.open(DetailExamenComponent);
    modalRef.componentInstance.data = element;
    modalRef.componentInstance.idexamen = element?.id;
    modalRef.componentInstance.categoriee = element?.categorie;
  }

  delete(id:any){
    Swal.fire({
      title: 'confirmation',
      text: "Vous voulez vraiment confirmer la suppression !",
      icon: 'error',
      showCancelButton: true,
      cancelButtonText: 'annuler',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'oui, supprimer'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteExamen(id).subscribe(data=>{
          this.store.dispatch(loadExamenReussiAction({idAutoEcole: localStorage.getItem('autoEcole_id')}));
          this.store.dispatch(loadExamenNoReussiAction({idAutoEcole: localStorage.getItem('autoEcole_id')}));
        })
      }
    })
   
  }
  
  onChange(e:any){
    if(e.target.value === ''){
      this.dataSource = new MatTableDataSource(this.resultatCandidatReussi);  
      this.dataSource = new MatTableDataSource(this.resultatCandidatNoReussi);
    }else{
      let filterData = _.filter(this.resultatCandidatReussi, (item)=>{
        return item.categorie.toLowerCase() == e.target.value.toLowerCase()
      })
      let filterData1 = _.filter(this.resultatCandidatNoReussi, (item)=>{
        return item.categorie.toLowerCase() == e.target.value.toLowerCase()
      })
      this.dataSource = new MatTableDataSource(filterData);
     

      this.dataSource1 = new MatTableDataSource(filterData1);
      
    }
    this.dataSource.sort = this.empTbSort;
    this.dataSource.paginator = this.paginatorFirst;
    this.dataSource1.sort = this.empTbSort1;
    this.dataSource1.paginator = this.paginatorSecond;
  }
  onchangeInput(e:any){
    if(e.target.value === ''){
      this.dataSource = new MatTableDataSource(this.resultatCandidatReussi);
      this.dataSource1 = new MatTableDataSource(this.resultatCandidatNoReussi);
    }else{
        let filterData = _.filter(this.resultatCandidatReussi, (item)=>{
          return item.date_examen.toLowerCase() == e.target.value.toLowerCase()
        })
        let filterData1 = _.filter(this.resultatCandidatNoReussi, (item)=>{
          return item.date_examen.toLowerCase() == e.target.value.toLowerCase()
        })
        this.dataSource = new MatTableDataSource(filterData);
        this.dataSource = new MatTableDataSource(filterData1);
    }
    this.dataSource.paginator = this.paginatorFirst;
    this.dataSource.sort = this.empTbSort;
    this.dataSource1.sort = this.empTbSort1;
    this.dataSource1.paginator = this.paginatorSecond;
  }
  onChangeMoniteur(e:any){
    if(e.target.value === ''){
      this.dataSource = new MatTableDataSource(this.resultatCandidatReussi);  
      this.dataSource = new MatTableDataSource(this.resultatCandidatNoReussi);
    }else{
      let filterData = _.filter(this.resultatCandidatReussi, (item)=>{
        return item.moniteur_pratique_id == e.target.value
      })
      let filterData1 = _.filter(this.resultatCandidatNoReussi, (item)=>{
        return item.moniteur_pratique_id == e.target.value
      })
      this.dataSource = new MatTableDataSource(filterData);
      this.dataSource1 = new MatTableDataSource(filterData1);
    }
    this.dataSource.sort = this.empTbSort;
    this.dataSource.paginator = this.paginatorFirst;
    this.dataSource1.sort = this.empTbSort1;
    this.dataSource1.paginator = this.paginatorSecond;
  }
}
