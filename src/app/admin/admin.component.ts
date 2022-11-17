import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth/auth.service';
import { DataService } from '../services/data.service';
import { loadAutoEcolesApprover } from '../state/autoecolesApprover/autoecolesApprover.acttions';
import { AutoecolesApproverState } from '../state/autoecolesApprover/autoecolesApprover.state';
import { loadAutoEcolesEnAttente } from '../state/autoecolesEnAttente/autoecolesEnAttente.actions';
import { AutoecolesEnAttenteState } from '../state/autoecolesEnAttente/autoecolesEnAttente.state';
import { loadSuperAdminData } from '../state/dataSuperAdmin/dataSuperAdmin.actions';
import { DataSuperAdminState } from '../state/dataSuperAdmin/dataSuperAdmin.state';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['nom_auto_ecole', 'telephone','etat', 'tel_responsable', 'pays','actions'];    
  dataSource!: MatTableDataSource<any>;
  dataSource1!: MatTableDataSource<any>;
  displayedColumns1: string[] = ['cin', 'numero_contrat', 'nom', 'date_inscription', 'categorie','actions'];     
  @ViewChild('empTbSort1') empTbSort1 = new MatSort();
  @ViewChild('paginatorSecond') paginatorSecond!: MatPaginator; 
  n:any;
  n1:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public etat_auto_ecole = 'en_attente';
   dateVal = new Date();
   urlLogo:any;
   totalAE:any;
   totalAEA:any;
   datang:any;

   dataSuperAdmin:any;
   totalAECOLEarchive:any;
   autoEcoleApprouver:any;
   autoEcoleEnAttente:any;
   totalAE_Attente:any;
   public yearsPaiement = ['2017', '2018', '2019']
  //  displayedColumns: string[] = ['month', 'depense', 'recette', 'solde'];
  constructor(private dataService: DataService,
              private auth:AuthService,
              private store: Store<{dataSuperAdmin: DataSuperAdminState, autoecolesApprover: AutoecolesApproverState,autoecolesEnAttente: AutoecolesEnAttenteState}>
    ) { }
  ngOnInit(): void {
    this.auth.authStatus.subscribe(value=>{
        if(value){
          this.getDataSuperAdmin();
          this.loadData();
          this.getAutoEcolesEnAttente()
        }
    })

  }
  loadData(){
    this.dataService.getAutoEcoleApprover().subscribe(data=>{
      this.autoEcoleApprouver = data;
      this.dataSource = new MatTableDataSource(this.autoEcoleApprouver)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
   }
   getAutoEcolesEnAttente(){
    this.dataService.getAutoEcolesEnAttente().subscribe(data=>{
      this.autoEcoleEnAttente = JSON.parse(data);
      this.dataSource1 = new MatTableDataSource(this.autoEcoleEnAttente)
      this.dataSource1.sort = this.empTbSort1;
      this.dataSource1.paginator = this.paginatorSecond;
    })
   }
  getDataSuperAdmin(){
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.dataSuperAdmin.dataSuperAdmin.loaded){
        this.store.dispatch(loadSuperAdminData());
      }
    })
    this.store.select(state=>state.dataSuperAdmin.dataSuperAdmin.dataSuperAdmin).subscribe(dataSuperAdmin=>{
      this.dataSuperAdmin = dataSuperAdmin
      this.totalAE = this.dataSuperAdmin?.totalAE
      this.totalAEA = this.dataSuperAdmin?.totalAEA
      this.totalAECOLEarchive = this.dataSuperAdmin?.totalAECOLEarchive
      this.totalAE_Attente = this.dataSuperAdmin?.totalAE_Attente
    })
  }
  getAutoEcoleApprouve(){
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.autoecolesApprover.autoecolesApprover.loaded){
        this.store.dispatch(loadAutoEcolesApprover())
      }
    })
    this.store.select(state=>state.autoecolesApprover.autoecolesApprover.autoecolesApprover).subscribe(autoecolesApprover=>{
      this.autoEcoleApprouver = autoecolesApprover;
    })
}
getAutoEcoleEnAttente(){
  this.store.pipe(take(1)).subscribe(store=>{
    if(!store.autoecolesEnAttente.autoecolesEnAttente.loaded){
      this.store.dispatch(loadAutoEcolesEnAttente());
    }
  })
  this.store.select(state=>state.autoecolesEnAttente.autoecolesEnAttente.autoecolesEnAttente).subscribe(autoecolesEnAttente=>{
    this.autoEcoleEnAttente = autoecolesEnAttente;
  })
}


desapprover(id:any){
  Swal.fire({
    title: 'confirmation',
    text: "voulez vraiment désapprouver cet auto-école?",
    icon: 'error',
    showCancelButton: true,
    cancelButtonText: 'annuler',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'oui , désapprouver'
  }).then((result) => {
    if (result.isConfirmed) {
      this.dataService.desapprover(id).subscribe(data=>{
        this.store.dispatch(loadAutoEcolesApprover())
         this.store.dispatch(loadSuperAdminData());
       })
    }
  })

}
approver(id:any){
  Swal.fire({
    title: 'confirmation',
    text: "voulez vraiment approuver cet auto-école?",
    icon: 'error',
    showCancelButton: true,
    cancelButtonText: 'annuler',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'oui, approuver'
  }).then((result) => {
    if (result.isConfirmed) {
      this.dataService.approver(id).subscribe(data=>{
        this.store.dispatch(loadAutoEcolesEnAttente());
       })
    }
  })
 
}
}
