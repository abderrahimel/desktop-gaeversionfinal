import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { loadAutoEcolesApprover } from 'src/app/state/autoecolesApprover/autoecolesApprover.acttions';
import { AutoecolesApproverState } from 'src/app/state/autoecolesApprover/autoecolesApprover.state';
import { loadSuperAdminData } from 'src/app/state/dataSuperAdmin/dataSuperAdmin.actions';
import { DataSuperAdminState } from 'src/app/state/dataSuperAdmin/dataSuperAdmin.state';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbonnementmodalComponent } from 'src/app/modal/abonnementmodal/abonnementmodal.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ContratAutoEcoleComponent } from 'src/app/modal/contrat-auto-ecole/contrat-auto-ecole.component';
@Component({
  selector: 'app-approuve-admin',
  templateUrl: './approuve-admin.component.html',
  styleUrls: ['./approuve-admin.component.css']
})
export class ApprouveAdminComponent implements OnInit { 
  displayedColumns: string[] = ['nom_auto_ecole', 'telephone','etat', 'tel_responsable', 'pays','actions'];    
  dataSource!: MatTableDataSource<any>;
  n:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataLoad:any;
  hiddingNewAbonnement:boolean = false;
  dateVal = new Date();
  idAutoEcole:any;
  boolAbonnement:boolean = false;
  action:any = '';
  idAbonnemet:any;
  idAuto:any;
  autoEcoleApprouver:any;
  datAbonnement:any;
  submitted:any = false;
  form = new FormGroup({          
    prix: new FormControl('', Validators.required),
    date_debut: new FormControl('', Validators.required),
    date_fin: new FormControl('', Validators.required),
  });
  constructor(private dataService:DataService,
              private store: Store<{dataSuperAdmin: DataSuperAdminState, autoecolesApprover: AutoecolesApproverState}>,
              private   modalService: NgbModal,
              private auth:AuthService,
    ) { }
  ngOnInit(): void {
    this.auth.authStatus.subscribe(value=>{
      if(value){
        // this.getAutoEcoleApprouve();
        this.loadData();
      }
    })
  }
  applyFilter(event:any){
    let value = event.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }
  getAutoEcoleApprouve(){
      this.store.pipe(take(1)).subscribe(store=>{
        if(!store.autoecolesApprover.autoecolesApprover.loaded){
          this.store.dispatch(loadAutoEcolesApprover())
        }
      })
      this.store.select(state=>state.autoecolesApprover.autoecolesApprover.autoecolesApprover).subscribe(autoecolesApprover=>{
        this.autoEcoleApprouver = autoecolesApprover;
        console.log("auto ecole aprove");console.log(this.autoEcoleApprouver);
        this.dataSource = new MatTableDataSource(this.dataLoad)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if(this.autoEcoleApprouver){
          this.n = this.autoEcoleApprouver.reduce((acc, o) => acc + Object.keys(o).length, 0)
        }
      })
  }
   loadData(){
    this.dataService.getAutoEcoleApprover().subscribe(data=>{
      this.dataLoad = data;
      this.dataSource = new MatTableDataSource(this.dataLoad)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.n = this.dataLoad.reduce((acc, o) => acc + Object.keys(o).length, 0)
    })
   }
  recuperAutoEcole(id:any){
     this.dataService.recuperAutoEcole(id).subscribe(data =>{
      this.store.dispatch(loadAutoEcolesApprover())
      this.store.dispatch(loadSuperAdminData());
     })
  }

  deleteAutoEcole(id:any){
    Swal.fire({
      title: 'confirmation',
      text: "Vous voulez vraiment confirmer la suppression!",
      icon: 'error',
      showCancelButton: true,
      cancelButtonText: 'annuler',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'oui, supprimer'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deletAutoEcole(id).subscribe(data =>{
          this.store.dispatch(loadAutoEcolesApprover())
          this.store.dispatch(loadSuperAdminData());
        })
      }
    })
   
  }
 
  setEtat(id:any, etat:any){
    //  approver desapprover
    console.log(id, etat);
    if(etat === 'en_attente'){
      console.log('approver');
    }else{
      console.log('desapprover');
    }
  }

  abonnement(id:any){
    console.log("id abonnement");
    this.submitted = true;
     if(this.form.invalid){
       console.log("form invalid");
       return;
     }
     this.dataService.updateabonnement(this.idAbonnemet,{
      prix: this.form.value.prix,
      date_debut: this.form.value.date_debut,
      date_fin: this.form.value.date_fin
   }).subscribe(data =>{
     console.log("abonnement");
     console.log(JSON.parse(data));
     this.hiddingNewAbonnement = false;
   })
  }
  
  hiddingNewP(bool:any){
    this.hiddingNewAbonnement = bool;
    this.form.patchValue({
      prix: null,
      date_debut: null,
      date_fin: null,
    });
  }
  showForm(abonnement:any){
    this.idAbonnemet = abonnement.id;
    console.log("id abonnement", this.idAbonnemet);
    this.hiddingNewAbonnement = true;
      // console.log(JSON.parse(data));
      if(abonnement.date_debut != null){
        this.action = "Modifier";
        this.boolAbonnement = true;
        this.form.patchValue({
          prix: abonnement.prix,
          date_debut: abonnement.date_debut,
          date_fin: abonnement.date_fin,
        });
      }else{
        this.action = "Ajouter";
        this.boolAbonnement = false;
      }
   
  }
  approver(id:any){
    Swal.fire({
      title: 'confirmation',
      text: "Vous voulez vraiment approuver cet auto-école",
      icon: 'error',
      showCancelButton: true,
      cancelButtonText: 'annuler',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'oui , approuver'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.approver(id).subscribe(data=>{
          this.store.dispatch(loadAutoEcolesApprover())
         this.store.dispatch(loadSuperAdminData());
        })
      }
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
 open(data:any, btn:any){
  const modalRef = this.modalService.open(AbonnementmodalComponent);
  modalRef.componentInstance.btn = btn;
  modalRef.componentInstance.data = data;
}
contrat(data:any){
  const modalRef = this.modalService.open(ContratAutoEcoleComponent);
  modalRef.componentInstance.data = data;
}
}
