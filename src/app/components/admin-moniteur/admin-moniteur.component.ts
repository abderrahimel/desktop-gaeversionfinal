import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MoniteurAdminmodalComponent } from 'src/app/modal/moniteur-adminmodal/moniteur-adminmodal.component';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { MoniteuradminState } from 'src/app/state/moniteuradmin/moniteuradmin.state';
import { take } from 'rxjs/operators';
import { loadMoniteurAdminAction } from 'src/app/state/moniteuradmin/moniteuradmi.action';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-admin-moniteur',
  templateUrl: './admin-moniteur.component.html',
  styleUrls: ['./admin-moniteur.component.css']
})
export class AdminMoniteurComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['image', 'nom', 'date', 'salaire', 'actions'];    
  dataSource!: MatTableDataSource<any>;
  posts:any;
  n:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dateVal = new Date();
  dataLoad:any;
  hidding:boolean = false;
  moniteurJ:any;
  hiddingNewMoniteur:boolean = false;
  base64Img_image:any;
  idM:any;
  prix:any;
  showing:any = false;
  description:any;
  titre:any;
  btn:boolean = true;
  titreOfForm:any;
  update:any = false;
  withPrixPromotion:boolean = false;
  submitted:boolean = false;
  id:any;
  moniteursJob:any;
  hidd:boolean = false; 
  form = new FormGroup({   
    nom: new FormControl('', Validators.required),   
    description: new FormControl('', Validators.required),
    salaire: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required), 
    image: new FormControl(''), 
  });
  
  constructor(private dataService: DataService,
              private   modalService: NgbModal,
              private auth:AuthService,
              private store: Store<{moniteuradmin: MoniteuradminState}>,
    ) { }

  ngOnInit(): void {
    this.auth.authStatus.subscribe(value=>{
      if(value){
        this.getMoniteurs();
      }
    })
  }
  ngAfterViewInit() {
   }
   applyFilter(event:any){
    let value = event.target.value
    this.dataSource.filter = value.trim().toLowerCase()
  }
  loadData(){
    this.store.pipe(take(1)).subscribe(store=>{
            if(!store.moniteuradmin.moniteuradmin.moniteuradmin.loaded){
              this.store.dispatch(loadMoniteurAdminAction());
            }  
    })
     this.store.select(state=>state.moniteuradmin.moniteuradmin.moniteuradmin.moniteuradmin).subscribe(moniteuradmin=>{
      this.moniteursJob = moniteuradmin;
     })
  }
  getMoniteurs(){
    this.dataService.getMoniteurJob().subscribe(data=>{
      this.moniteursJob = JSON.parse(data);
      this.dataSource = new MatTableDataSource(this.moniteursJob)

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.n = this.moniteursJob.reduce((acc, o) => acc + Object.keys(o).length, 0)
    })
  }
  newProduit(){

  }
  hiddingNewP(b:boolean){
    this.titreOfForm = 'Ajouter Moniteur'
     this.showing = true;
     this.update = false;
  }
  fileChangeEvent(event: any) {
    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                    const imgBase64Path = e.target.result;
                    this.base64Img_image = imgBase64Path;
                  
                    
            };
        };

        reader.readAsDataURL(event.target.files[0]);
    }
}

  show(bool:boolean, id:any){
    
  }
  deleteProduitAdmin(id:any){
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
        this.dataService.deleteMoniteurJob(id).subscribe(data=>{
          this.getMoniteurs();
          this.store.dispatch(loadMoniteurAdminAction());
        })
      }
    })
    
  }
  boolShow(event:any){

  }



  fermer(){
    this.showing = false;
    this.btn = true;
    this.form.patchValue({
      nom: null,   
      description: null,   
      salaire: null,   
      date: null,   
  })
  }
  detail(id:any){
    this.btn = false;
    this.titreOfForm = 'Détail Moniteur'
    this.showing = true;
    this.dataService.getMoniteurJobById(id).subscribe(data=>{
      this.moniteurJ = JSON.parse(data)
      this.form.patchValue({
          nom: this.moniteurJ.nom,   
          description: this.moniteurJ.description,   
          salaire: this.moniteurJ.salaire,   
          date: this.moniteurJ.date,   
      })
    })
  }
  modifier(id:any){
        this.idM = id;
        this.update = true;
        this.titreOfForm = 'Modifier moniteur'
        this.showing = true;
        this.dataService.getMoniteurJobById(id).subscribe(data=>{
          this.moniteurJ = JSON.parse(data)
          this.form.patchValue({
              nom: this.moniteurJ.nom,   
              description: this.moniteurJ.description,   
              salaire: this.moniteurJ.salaire,   
              date: this.moniteurJ.date,   
          })
        })
  }
  open(data:any, btn:any){
    const modalRef = this.modalService.open(MoniteurAdminmodalComponent);
    modalRef.componentInstance.btn = btn;
    modalRef.componentInstance.data = data;
  }
}
