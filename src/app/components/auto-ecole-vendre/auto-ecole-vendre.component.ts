import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { AutoecolevendreModalComponent } from 'src/app/modal/autoecolevendre-modal/autoecolevendre-modal.component';
import { DataService } from 'src/app/services/data.service';
import { loadautoecolevendreaction } from 'src/app/state/autoecolevendre/autoecolevendre.action';
import { AutoecolevendreState } from 'src/app/state/autoecolevendre/autoecolevendre.state';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import Swal from 'sweetalert2';
import {MatSort, Sort} from '@angular/material/sort';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-auto-ecole-vendre',
  templateUrl: './auto-ecole-vendre.component.html',
  styleUrls: ['./auto-ecole-vendre.component.css']
})
export class AutoEcoleVendreComponent implements OnInit, AfterViewInit  {
  displayedColumns: string[] = ['image', 'titre', 'date', 'prix', 'actions'];    
  dataSource!: MatTableDataSource<any>;
  posts:any;
  n:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dateVal = new Date();
  dataLoad:any;
  hidding:boolean = false;
  autoEcoleVendre:any;
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
  autoecoleVendre:any;
  hidd:boolean = false;  
  form = new FormGroup({   
    titre: new FormControl('', Validators.required),   
    description: new FormControl('', Validators.required),
    prix: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required), 
    image: new FormControl(''), 
  });
  
  constructor(private dataService: DataService,
              private store: Store<{autoecolevendre: AutoecolevendreState}>,
              private   modalService: NgbModal,
              private auth:AuthService,

    ) { 
      
    }
    ngAfterViewInit() {
    }
  ngOnInit(): void {
    this.auth.authStatus.subscribe(value=>{
      if(value){
        this.getData();
      }
    })
  }
  applyFilter(event:any){
    let value = event.target.value
    this.dataSource.filter = value.trim().toLowerCase()
  }
  getData(){
    this.dataService.getAutoecoleVendre().subscribe(data=>{
      this.dataLoad = JSON.parse(data);
      this.dataSource = new MatTableDataSource(this.dataLoad)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.n = this.dataLoad.reduce((acc, o) => acc + Object.keys(o).length, 0)
    })
       
  }
  newProduit(){

  }
  hiddingNewP(b:boolean){
    this.titreOfForm = 'Ajouter Auto-ecole'
     this.showing = true;
     this.update = false;
  }

  show(bool:boolean, id:any){
    
  }
  deleteAutoecoleVendreAdmin(id:any){
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
        this.dataService.deleteAutoecoleVendre(id).subscribe(data=>{
          this.getData();
          this.store.dispatch(loadautoecolevendreaction());
        })
      }
    })
    
  }
  boolShow(event:any){

  }

  gestionAutoEcole(){
      this.submitted = true;
      if(this.form.invalid ){
        return;
      }
      if(this.update){
        let id = this.idM; 
        this.dataService.updateAutoecoleVendre(id, {
          image: this.base64Img_image,
          titre: this.form.value.titre,      
          description: this.form.value.description,   
          prix: this.form.value.prix,   
          date: this.form.value.date,   
        }).subscribe(data=>{
          this.showing = false;
          this.getData();
        });
      }else{
        // add moniteur
        this.dataService.addAutoecoleVendre({
          image: this.base64Img_image,
          titre: this.form.value.titre,   
          description: this.form.value.description,   
          prix: this.form.value.prix,   
          date: this.form.value.date,   
        }).subscribe(data=>{
          this.showing = false;
          this.getData();
        });
      }

  }

  fermer(){
    this.showing = false;
    this.btn = true;
    this.form.patchValue({
      titre: null,   
      description: null,   
      prix: null,   
      date: null,   
  })
  }
  detail(id:any){
    this.btn = false;
    this.titreOfForm = 'Détail Auto-ecole'
    this.showing = true;
    this.dataService.getAutoecoleVendreById(id).subscribe(data=>{
      this.autoEcoleVendre = JSON.parse(data)
      this.form.patchValue({
          titre: this.autoEcoleVendre.titre,   
          description: this.autoEcoleVendre.description,   
          prix: this.autoEcoleVendre.prix,   
          date: this.autoEcoleVendre.date,   
      })
    })
  }

  modifier(id:any){
        this.idM = id;
        this.update = true;
        this.titreOfForm = 'Modifier Auto-ecole';
        this.showing = true;
        this.dataService.getAutoecoleVendreById(id).subscribe(data=>{
          this.autoEcoleVendre = JSON.parse(data);
          this.form.patchValue({
              titre: this.autoEcoleVendre.titre,   
              description: this.autoEcoleVendre.description,   
              prix: this.autoEcoleVendre.prix,   
              date: this.autoEcoleVendre.date,   
          });
        });
  }
  open(data:any, btn:any){
    const modalRef = this.modalService.open(AutoecolevendreModalComponent);
    modalRef.componentInstance.btn = btn;
    modalRef.componentInstance.data = data;
  }
}
