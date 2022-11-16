import { Component, OnInit, ViewChild } from '@angular/core';
import { CandidatService } from 'src/app/services/candidat.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { CandidatState } from 'src/app/state/candidat/candidat.state';
import { Store } from '@ngrx/store';
import { candidatStart, deleteCandidatById, desactiveCandidatById } from 'src/app/state/candidat/candidat.actions';
import { take } from 'rxjs/operators';
import { loadhistoriquecandidat } from 'src/app/state/historiquecandidat/historiquecandidat.actions';
import { loadarchivecandidat } from 'src/app/state/archivecandidat/archivecandidat.actions';
import { archivecandidatState } from 'src/app/state/archivecandidat/archivecandidat.state';
import { historiquecandidatState } from 'src/app/state/historiquecandidat/historiquecandidat.state';
import Swal from 'sweetalert2';
import * as $ from "jquery";
import { ThisReceiver } from '@angular/compiler';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ContratFormationModalComponent } from 'src/app/modal/contrat-formation-modal/contrat-formation-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CertificatFormationModalComponent } from 'src/app/modal/certificat-formation-modal/certificat-formation-modal.component';
import { CarteCandidatModalComponent } from 'src/app/modal/carte-candidat-modal/carte-candidat-modal.component';
@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent implements OnInit  {
  displayedColumns: string[] = ['cin', 'numero_contrat', 'nom', 'date_inscription', 'categorie','actions'];    
  dataSource!: MatTableDataSource<any>;
  dataSource1 = new MatTableDataSource();
  n:any;
  @ViewChild('empTbSort') empTbSort = new MatSort();
  @ViewChild('paginatorFirst') paginatorFirst!: MatPaginator;   
  displayedColumns1: string[] = ['cin', 'numero_contrat', 'nom', 'date_inscription', 'categorie','actions'];     
  @ViewChild('empTbSort1') empTbSort1 = new MatSort();
  @ViewChild('paginatorSecond') paginatorSecond!: MatPaginator; 
  active = 1;
  data:any[]=[];
  message= '';
  candidat_data:any;
  dateVal = new Date();
  current_candidat:any;
  candidat_data_s:any;
  candidatsB:any;  
  candidatS:any;
  id_candidat:any;
  hidden:any = true;
  dataLoad:any
  autoecole:any;
  user:any;

  constructor(private candidatData: CandidatService,
              private _auth:AuthService,
              private router: Router,
              private dataservice: DataService,
              private store:Store<{candidat:CandidatState, archivecandidat: archivecandidatState, historiquecandidat: historiquecandidatState}>,
              private auth:AuthService,
              private modalService: NgbModal,

              ){
              }

  ngOnInit(): void {
    this.auth.authStatus.subscribe(value=>{
      if(value){
        this.getCandidatsBasic()
        this.getCandidatsSupplementaire();
        this.getautoecole()
        this.getUser()
      }
    })
  }
  getUser(){
    this.auth.getUser().subscribe(user=>this.user = user)
  }
  getautoecole(){
    this.dataservice.getAutoEcoleById(localStorage.getItem('autoEcole_id')).subscribe(data=>this.autoecole = data)
}
  applyFilter(event:any){
    let value = event.target.value
    this.dataSource.filter = value.trim().toLowerCase()
  }
  applyFilter1(event:any){
    let value = event.target.value
    this.dataSource1.filter = value.trim().toLowerCase()
  }
  getCandidatsSupplementaire(){
    this.dataservice.getCandidatsSupplementaire(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.candidatS = JSON.parse(data)
      this.dataSource1  = new MatTableDataSource(this.candidatS);
      this.dataSource1.sort = this.empTbSort1;
      this.dataSource1.paginator = this.paginatorSecond;
    },
    error=> {}
    )
  }  
  getCandidatsBasic(){
    this.dataservice.getCandidatsBasic(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.candidatsB = JSON.parse(data);
      this.dataSource  = new MatTableDataSource(this.candidatsB);
      this.dataSource.sort = this.empTbSort;
      this.dataSource.paginator = this.paginatorFirst;
      // this.lengthExamen = this.candidatsB.reduce((acc, o) => acc + Object.keys(o).length, 0)
    },
    error=>{}
    )
  }  
  loadData(info:any){
      if(info === "supplementaire"){
        this.dataLoad = this.candidat_data_s;
        this.hidden = false;
      }else{
        this.dataLoad = this.candidat_data.filter(candidat => candidat.type_formation != "supplementaire");
        this.hidden = true;
      }
  }
  changestyle(name:any){
    if(name === '.fb'){
      $('.fb').css('border', '1px solid red');
      $('.fb').css('color', 'red');
      $('.cs').css('border', '1px solid rgb(189, 186, 186)');
      $('.cs').css('color', 'rgb(189, 186, 186)');
    }else{
      $('.fb').css('border', '1px solid rgb(189, 186, 186)');
      $('.fb').css('color', 'rgb(189, 186, 186)');
      $('.cs').css('border', '1px solid red');
      $('.cs').css('color', 'red');
    }
  }
  handlerror(error:any){
      console.log(error);
  }
  idcandidat(id:any){
      // this.id_candidat = id;
  }
  deleteCandidat(id:any, e:any){
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
        this.store.dispatch(deleteCandidatById({id: id}));
        this.store.dispatch(loadarchivecandidat({idAutoEcole: localStorage.getItem('autoEcole_id')}));
        this.getCandidatsBasic()
        this.getCandidatsSupplementaire();
      }
    })
  
  }
  
  desactiverCandidat(id:any, e:any){

    Swal.fire({
      title: 'confirmation',
      text: "Vous voulez vraiment confirmer la désactivation!",
      icon: 'error',
      showCancelButton: true,
      cancelButtonText: 'annuler',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'oui , désactiver'
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(desactiveCandidatById({id: id}))
        this.store.dispatch(loadhistoriquecandidat({idAutoEcole: localStorage.getItem('autoEcole_id')}));
        this.getCandidatsBasic()
        this.getCandidatsSupplementaire();
      }
    })
  }
  openContratModal(element:any){
    const modalRef = this.modalService.open(ContratFormationModalComponent);
    modalRef.componentInstance.data = element;
    modalRef.componentInstance.autoecole = this.autoecole;
    modalRef.componentInstance.user = this.user;
  }
  openCertificatFormationModal(element:any){
    // CertificatFormationModalComponent
    const modalRef = this.modalService.open(CertificatFormationModalComponent);
    modalRef.componentInstance.data = element;
    modalRef.componentInstance.autoecole = this.autoecole;
    modalRef.componentInstance.user = this.user;
  }
  openCarteCandidat(element:any){
    const modalRef = this.modalService.open(CarteCandidatModalComponent);
    modalRef.componentInstance.data = element;
    modalRef.componentInstance.autoecole = this.autoecole;
    modalRef.componentInstance.user = this.user;
  }
}

