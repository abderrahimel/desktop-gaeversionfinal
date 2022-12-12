import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data.service';
import { loadAutoEcolesEnAttente } from 'src/app/state/autoecolesEnAttente/autoecolesEnAttente.actions';
import { AutoecolesEnAttenteState } from 'src/app/state/autoecolesEnAttente/autoecolesEnAttente.state';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auto-ecole-en-attente',
  templateUrl: './auto-ecole-en-attente.component.html',
  styleUrls: ['./auto-ecole-en-attente.component.css']
})
export class AutoEcoleEnAttenteComponent implements OnInit {
  displayedColumns: string[] = ['nom_auto_ecole', 'telephone','etat', 'tel_responsable', 'pays','actions'];     
  dataSource!: MatTableDataSource<any>;
  n:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataLoad:any;
  hiddingNewAbonnement:boolean = false;
  dateVal = new Date();
  autoEcoleEnAttente:any;

  constructor(private dataService:DataService,
    private store: Store<{autoecolesEnAttente: AutoecolesEnAttenteState}>,
    private auth:AuthService
    ) { }

  ngOnInit(): void {
     this.auth.authStatus.subscribe(value=>{
      if(value){
        // this.getAutoEcoleEnAttente();
        this.loadData();
      }
     })

  }
  loadData(){
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.autoecolesEnAttente.autoecolesEnAttente.loaded){
          this.store.dispatch(loadAutoEcolesEnAttente());
      }
      this.store.select(state=>state.autoecolesEnAttente.autoecolesEnAttente.autoecolesEnAttente).subscribe(autoecoleenattent=>{
        this.dataLoad = autoecoleenattent;
        this.dataSource = new MatTableDataSource(this.dataLoad)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataLoad);
      })
    })
   }
  getAutoEcoleEnAttente(){
      this.store.pipe(take(1)).subscribe(store=>{
        if(!store.autoecolesEnAttente.autoecolesEnAttente.loaded){
          this.store.dispatch(loadAutoEcolesEnAttente());
        }
      })
      this.store.select(state=>state.autoecolesEnAttente.autoecolesEnAttente.autoecolesEnAttente).subscribe(autoecolesEnAttente=>{
        console.log("autoecolesEnAttente from the store");
        console.log(autoecolesEnAttente);
        this.autoEcoleEnAttente = autoecolesEnAttente;
        this.dataSource = new MatTableDataSource(this.autoEcoleEnAttente)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.n = this.dataLoad.reduce((acc, o) => acc + Object.keys(o).length, 0)
      })
    
  }
  applyFilter(event:any){
    let value = event.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  deleteAutoEcole(id:any){
    Swal.fire({
      title: 'confirmation',
      text: "voulez vraiment supprimer cet auto-école?",
      icon: 'error',
      showCancelButton: true,
      cancelButtonText: 'annuler',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'oui, supprimer'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deletAutoEcole(id).subscribe(data =>{
          this.store.dispatch(loadAutoEcolesEnAttente());
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
