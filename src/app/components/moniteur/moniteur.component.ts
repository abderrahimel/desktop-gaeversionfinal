import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DataService } from 'src/app/services/data.service';
import { MoniteurState } from 'src/app/state/moniteur/moniteur.state';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MoniteurModalComponent } from 'src/app/modal/moniteur-modal/moniteur-modal.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { take } from 'rxjs/operators';
import { deleteMoniteurT, loadMoniteurT } from 'src/app/state/moniteur/moniteur.actions';
import { deleteMoniteurP, loadMoniteurP } from 'src/app/state/moniteurPratique/moniteurPratique.actions';
import { MoniteurPratiqueState } from 'src/app/state/moniteurPratique/moniteurPratique.state';
@Component({
  selector: 'app-moniteur',
  templateUrl: './moniteur.component.html',
  styleUrls: ['./moniteur.component.css']
})
export class MoniteurComponent implements OnInit {
  displayedColumns: string[] = ['cin',  'nom',  'telephone',  'type',  'newCategorie', 'date_embauche', 'actions']; 
  displayedColumns1: string[] = ['cin',  'nom',  'telephone',  'type',  'newCategorie', 'date_embauche', 'actions']; 
  @ViewChild('empTbSort') empTbSort = new MatSort();
  @ViewChild('empTbSortsecond') empTbSortsecond = new MatSort();
  @ViewChild('paginatorFirst') paginatorFirst!: MatPaginator;
  @ViewChild('paginatorSecond') paginatorSecond!: MatPaginator;
  dataSource = new MatTableDataSource();    
  dataSource1 = new MatTableDataSource();    
  data:any[]=[];
  dateVal = new Date();
  datamoniteurT:any;
  datamoniteurP:any;
  constructor(private store: Store<{moniteur: MoniteurState, moniteurPratique: MoniteurPratiqueState}>,
              private router: Router,
              private route: ActivatedRoute,
              private dataService: DataService,
              private modalService: NgbModal,
              private auth:AuthService
    ) { }

  ngOnInit(): void {
    this.auth.authStatus.subscribe(value=>{
      if(value){
        this.getData();
      }
    })
  }
  applyFilter(event:any){
    let value = event.target.value
    if(value){
      this.dataSource.filter = value.trim().toLowerCase()
    }
  }
  applyFilter1(event:any){
    let value = event.target.value
    if(value){
      this.dataSource1.filter = value.trim().toLowerCase()
    }
  }
  getData(){
    // load moniteurs theorique
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.moniteur.moniteur.moniteurTheorique.loaded){
        this.store.dispatch(loadMoniteurT({idAutoEcole:localStorage.getItem('autoEcole_id')}));
      }
      this.store.select(state=>state.moniteur.moniteur.moniteurTheorique.moniteurTheorique).subscribe(moniteurs=>{
        this.datamoniteurT = moniteurs;
        if(this.datamoniteurT){
          this.datamoniteurT.map(mt=>{
            let categories = mt?.categorie
            // mt['categorie'] = categories.join('-');
          });
          this.dataSource = new MatTableDataSource(this.datamoniteurT)
            this.dataSource.paginator = this.paginatorFirst;
            this.dataSource.sort = this.empTbSort;
        }
        
      });
      //load moniteurs pratique
      if(!store.moniteurPratique.moniteurPratique.loaded){
        this.store.dispatch(loadMoniteurP({idAutoEcole:localStorage.getItem('autoEcole_id')}));
      }
      this.store.select(state=>state.moniteurPratique.moniteurPratique.moniteurPratique).subscribe(moniteurs=>{
          this.datamoniteurP = moniteurs;
           if(this.datamoniteurP){
            this.datamoniteurP.map(mp=>{
              let categories = mp?.categorie
              // mp['categorie'] = categories.join('-');
            });
            this.dataSource1 = new MatTableDataSource(this.datamoniteurP)
            this.dataSource1.paginator = this.paginatorSecond;
            this.dataSource1.sort = this.empTbSortsecond;
           }
      })
    })
  }
 reloadData(){
  this.dataService.getMoniteurT(localStorage.getItem('autoEcole_id')).subscribe(data=>{
    this.datamoniteurT = data;
    this.datamoniteurT.map(mt=>{
      let categories = mt?.categorie
      mt['newCategorie'] = categories.join('-');
    });
    this.dataSource = new MatTableDataSource(this.datamoniteurT)
      this.dataSource.paginator = this.paginatorFirst;
      this.dataSource.sort = this.empTbSort;
  })
  this.dataService.getMoniteurP(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.datamoniteurP = data;
      this.datamoniteurP.map(mp=>{
        let categories = mp?.categorie
        mp['newCategorie'] = categories.join('-');
      });
      this.dataSource1 = new MatTableDataSource(this.datamoniteurP)
      this.dataSource1.paginator = this.paginatorSecond;
      this.dataSource1.sort = this.empTbSortsecond;
  });
 }


  deletMoniteurT(id:any){
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
        this.store.dispatch(deleteMoniteurT({id: id}));
        this.store.dispatch(loadMoniteurT({idAutoEcole:localStorage.getItem('autoEcole_id')}));
      }
    })
   
  }

 deletMoniteurP(id:any){
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
      this.store.dispatch(deleteMoniteurP({id: id}));
      this.store.dispatch(loadMoniteurP({idAutoEcole:localStorage.getItem('autoEcole_id')}));
    }
  })
    
  }
  open(btn:any,type:any, data:any) { 
    const modalRef = this.modalService.open(MoniteurModalComponent);
    modalRef.componentInstance.btn = btn;
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.type = type;
  } 
}
