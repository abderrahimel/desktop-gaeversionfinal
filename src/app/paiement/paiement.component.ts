import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { deletepaimentById, loadPaiment, updateIdCandidat } from '../state/peimentCandidat/paimentCandidat.actions';
import { PaimentCandidatState } from '../state/peimentCandidat/peimentCandidat.state';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaimentCandidatModalComponent } from '../modal/paiment-candidat-modal/paiment-candidat-modal.component';
import { CandidatState } from '../state/candidat/candidat.state';
import { candidatStart } from '../state/candidat/candidat.actions';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ModelRecuPaimentCandidatComponent } from '../modal/model-recu-paiment-candidat/model-recu-paiment-candidat.component';
import { AuthService } from '../services/auth/auth.service';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})           
export class PaiementComponent implements OnInit {
  displayedColumns: string[] = ['date', 'montant', 'type_p','actions'];    
  dataSource!: MatTableDataSource<any>;
  @ViewChild('empTbSort') empTbSort = new MatSort();
  @ViewChild('paginatorFirst') paginatorFirst!: MatPaginator;  
  autoecole:any;
  dateVal = new Date();
  paiement_data:any;
  montantCategorie:any;
  idCandidat:any;
  totalPaiment:any = 0;
  restPaiment:any;
  dataPaimentCandidat:any;
  candidats:any;
  user:any;
  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private auth:AuthService,
              private router:Router,
              private store:Store<{paimentCandidat: PaimentCandidatState, candidat:CandidatState,}>,
              private modalService: NgbModal, 
    ) { }

  ngOnInit(): void {
    this.getCandidats()
    this.load();
    this.getautoecole()
    this.getUser();
  }
  getUser(){
    this.auth.getUser().subscribe(user=>this.user = user)
  }
  getautoecole(){
      this.dataService.getAutoEcoleById(localStorage.getItem('autoEcole_id')).subscribe(data=>{
        this.autoecole = data
      })
  }
  getCandidats(){
    this.dataService.getCandidatById(Number(this.route.snapshot.paramMap.get('id'))).subscribe(data=>{
      console.log("candidats");
      console.log(JSON.parse(data));
      this.candidats = JSON.parse(data);
      this.montantCategorie = this.candidats?.montant;
    })
  }
  load(){
    this.idCandidat = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getCandidatById(this.idCandidat).subscribe(data =>{
      let mon = JSON.parse(data)
      this.restPaiment = this.montantCategorie
    })
    console.log(this.idCandidat);
    let auto_ecole_id = localStorage.getItem('autoEcole_id');

    this.dataService.getPaimentCandidat(auto_ecole_id, this.idCandidat).subscribe(data=>{
      this.dataPaimentCandidat = JSON.parse(data);
      this.dataSource  = new MatTableDataSource(this.dataPaimentCandidat);
      this.dataSource.sort = this.empTbSort;
      this.dataSource.paginator = this.paginatorFirst;
        let totalpay = 0
      this.dataPaimentCandidat.map((data:any)=>{
        totalpay += Number(data?.montant);
      })
      this.totalPaiment = totalpay
      this.dataPaimentCandidat.map(data=>{
        let montant =  parseInt(data?.montant);
        this.restPaiment -= montant;
      })
    })
  }
  
  applyFilter(event:any){
    let value = event.target.value
    this.dataSource.filter = value.trim().toLowerCase()
  }
  updateIdCandidat(){
    console.log("dispatch action set the id candidat");
    this.store.dispatch(updateIdCandidat({id: this.idCandidat}));
  }
  getData(){
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.paimentCandidat.paimentCandidat.loaded){
        console.log("dispatch action load paiment candidats to the state of the store");
        this.store.dispatch(loadPaiment({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
    });
    this.store.select(state=>state.paimentCandidat.paimentCandidat.paiment).subscribe(pc=>{
      console.log(" paiment candidats of this auto ecole");
      console.log(pc);
      this.dataPaimentCandidat = pc?.filter(pc => pc?.candidat_id === this.idCandidat);
    })
  }
  deletepaiment(id:any){
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
        this.store.dispatch(deletepaimentById({id}));
        this.load();
      }
    })
  }
  open(btn:any, data:any) {
    const modalRef = this.modalService.open(PaimentCandidatModalComponent);
    modalRef.componentInstance.btn = btn;
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.idcandidat = Number(this.route.snapshot.paramMap.get('id'));
  }
  openRecu(element:any){
    // ModelRecuPaimentCandidatComponent
     const modalRef = this.modalService.open(ModelRecuPaimentCandidatComponent);
     modalRef.componentInstance.data = element;
     modalRef.componentInstance.autoecole = this.autoecole;
     modalRef.componentInstance.candidat = this.candidats;
     modalRef.componentInstance.user = this.user;
  }
}
