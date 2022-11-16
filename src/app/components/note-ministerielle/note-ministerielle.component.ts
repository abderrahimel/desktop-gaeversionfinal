import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { loadministerielleaction } from 'src/app/state/ministerielle/ministerielle.actions';
import { MinisterielleState } from 'src/app/state/ministerielle/ministerielle.sate';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MinisteriellemodalComponent } from 'src/app/modal/ministeriellemodal/ministeriellemodal.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-note-ministerielle',
  templateUrl: './note-ministerielle.component.html',
  styleUrls: ['./note-ministerielle.component.css']
})
export class NoteMinisterielleComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['titre', 'date', 'actions'];    
  dataSource!: MatTableDataSource<any>;
  posts:any;
  n:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dateVal = new Date();
  dataLoad:any;
  hidding:boolean = false;
  noteMinisterielle:any;
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
  hidd:boolean = false;  
  form = new FormGroup({ 
    category: new FormControl('', Validators.required),   
    titre: new FormControl('', Validators.required),
    lien: new FormControl('', Validators.required),
    fichier: new FormControl(''), 
  });
  
  constructor(private dataService: DataService,
                private store: Store<{ministerielle: MinisterielleState}>,
                private modalService: NgbModal,
                private auth:AuthService,
    ) { }
  
  ngOnInit(): void {
    this.auth.authStatus.subscribe(value=>{
      if(value){
        this.getdatas()
      }
    })
  }
  ngAfterViewInit() {
 
   }
  getData(){ 
     this.store.pipe(take(1)).subscribe(store=>{
      if(!store.ministerielle.ministerielle.ministerielle.loaded){
        this.store.dispatch(loadministerielleaction())
      }
     })
     this.store.select(state=>state.ministerielle.ministerielle.ministerielle.ministerielle).subscribe(ministerielle=>{
      this.noteMinisterielle = ministerielle
     })


  }
  applyFilter(event:any){
    let value = event.target.value
    this.dataSource.filter = value.trim().toLowerCase()
  }
  getdatas(){
    this.dataService.getNoteMinisterielle().subscribe(data=>{
      this.noteMinisterielle = JSON.parse(data)
      this.dataSource = new MatTableDataSource(this.noteMinisterielle)
  
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.n = this.noteMinisterielle.reduce((acc, o) => acc + Object.keys(o).length, 0)
    })
  }
  newProduit(){

  }
  hiddingNewP(b:boolean){
    this.titreOfForm = 'Ajouter Auto-ecole'
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
 readFileAsync(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}
fileSelected = async (e) => {
  const fileList = e.target.files;
  if (fileList?.length > 0) {
    const pdfArrayBuffer = await this.readFileAsync(fileList[0]);
    // const base64pdf = 'data:application/pdf;base64,' + pdfArrayBuffer.toString('base64')
  }
};


  show(bool:boolean, id:any){
    
  }
  deleteAutoecoleVendreAdmin(id:any){
    Swal.fire({
      title: 'confirmation',
      text:  "Vous voulez vraiment confirmer la suppression !",
      icon:  'error',
      showCancelButton: true,
      cancelButtonText: 'annuler',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'oui, supprimer'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteNoteMinisterielle(id).subscribe(data=>{
          this.getdatas();
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
        this.dataService.updateNoteMinisterielle(id, {
          titre: this.form.value.titre,   
          category: this.form.value.category,   
          lien: this.form.value.lien,   
          // fichier: this.form.value.fichier, 
        }).subscribe(data=>{
          this.showing = false;
          this.getData();
        });
      }else{   
        // add moniteur
        this.dataService.addNoteMinisterielle({
          titre: this.form.value.titre,   
          category: this.form.value.category,   
          lien: this.form.value.lien,   
          // fichier: this.form.value.fichier, 
        }).subscribe(data=>{
          this.showing = false;
          this.getData();
        });
      }

  }

  fermer(){
    this.showing = false; 
    this.form.patchValue({
      titre: null,   
      category: "",   
      lien: null,   
      fichier: null,   
  })
  }
  detail(id:any){
    this.titreOfForm = 'Détail Auto-ecole';
    this.showing = true;
    this.dataService.getNoteMinisterielleById(id).subscribe(data=>{
      this.noteMinisterielle = JSON.parse(data)
      this.form.patchValue({
          titre: this.noteMinisterielle.titre,   
          category: this.noteMinisterielle.category,   
          lien: this.noteMinisterielle.lien,   
          // fichier: this.noteMinisterielle.fichier, 
      })
    })
  }

  modifier(id:any){
        this.idM = id;
        this.update = true;
        this.titreOfForm = 'Modifier Auto-ecole';
        this.showing = true;
        this.dataService.getNoteMinisterielleById(id).subscribe(data=>{
          this.noteMinisterielle = JSON.parse(data);
          this.form.patchValue({
            titre: this.noteMinisterielle.titre,   
            category: this.noteMinisterielle.category,   
            lien: this.noteMinisterielle.lien,   
            // fichier: this.noteMinisterielle.fichier, 
          });
        });
  }
  open( data:any, btn:any) {
    const modalRef = this.modalService.open(MinisteriellemodalComponent);
    modalRef.componentInstance.btn = btn;
    modalRef.componentInstance.data = data;
  }
}
