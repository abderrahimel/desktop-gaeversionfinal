import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as $ from "jquery";
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { addDepenseCategorie, deletDepenseCategorieById, loadCategoriedepense, updateDepenseCategorie } from 'src/app/state/depenseCategorie/depenseCategorie.actions';
import { DepenseCategorieState } from 'src/app/state/depenseCategorie/depenseCategorie.state';
import Swal from 'sweetalert2'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DepenseCategorieModalComponent } from 'src/app/modal/depense-categorie-modal/depense-categorie-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-depenses-categories',
  templateUrl: './depenses-categories.component.html',
  styleUrls: ['./depenses-categories.component.css']
})
export class DepensesCategoriesComponent implements OnInit {
  displayedColumns: string[] = ['categorie', 'actions'];    
  dataSource!: MatTableDataSource<any>;
  dataSource1!: MatTableDataSource<any>;
  posts:any;
  n:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  formModal: any;
  dateVal = new Date();
  dataLoad:any;
  type:any;
  dataPersonnel:any;
  dataVehicule:any;
  dataDepenseCategorie:any;
  dataLocal:any;
  is_add:any;
  submitted: boolean = false;
  idDepenseCategorie:any;
   action:any = 'Valider';
  form = new FormGroup({
    categorie: new FormControl('', Validators.required),
  })
  constructor(private dataService: DataService,
              private router:Router,
              private modalService: NgbModal,
              private store:Store<{categorieDepense: DepenseCategorieState}>,
              private auth:AuthService
    ) { }
  
  ngOnInit(): void {
    // depense personnel
    this.auth.authStatus.subscribe(value=>{
      if(value){
        // this.getCategoriePersonnel();
        this.getData();
      }
    })
  }
  openFormModal() {
    this.formModal.show();
  }
  saveSomeThing() {
    // confirm or save something
    this.formModal.hide();
  }
  applyFilter(event:any){
    let value = event.target.value
    this.dataSource.filter = value.trim().toLowerCase()
  }
  getData(){
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.categorieDepense.depenseCategorie.loaded){
        this.store.dispatch(loadCategoriedepense({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
      this.store.select(state=>state.categorieDepense.depenseCategorie).subscribe(categoriedepense=>{
        this.dataPersonnel = categoriedepense.categoriePersonnel;
        this.dataSource = new MatTableDataSource(this.dataPersonnel)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if(this.dataPersonnel){
          this.n = this.dataPersonnel.reduce((acc, o) => acc + Object.keys(o).length, 0)
        }
       
        this.dataVehicule  = categoriedepense.categorieVehicule;
        this.dataLocal     = categoriedepense.categorieLocal;
      })
    })
    
  }
  getCategoriePersonnel(){
    this.dataService.getCategorieDepensePersonnel(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.dataPersonnel = JSON.parse(data);
      console.log(this.dataPersonnel);
      this.dataSource = new MatTableDataSource(this.dataPersonnel)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.n = this.dataPersonnel.reduce((acc, o) => acc + Object.keys(o).length, 0)
    })
  }

  valider(){
    this.submitted = true;
    if(this.form.invalid){
      console.log("form invalid");
      return;
    }
    console.log("form is valid");
    let id_autoEcole = localStorage.getItem('autoEcole_id');
    let data = {
      categorie: this.form.value.categorie,
      type: this.type
    }
    console.log(data);
    if(this.is_add){
      // dispatch action add categorie depense; 
        this.store.dispatch(addDepenseCategorie({idAutoEcole: id_autoEcole,data}))
    }else{
      // dispatch action update categorie depense
        this.store.dispatch(updateDepenseCategorie({id:this.idDepenseCategorie, data }));
    }
    $('#categorie').css("display", "none");
    
  }
  changestyle(name:any){
    if(name === '.dcp'){
      $('.dcp').css('border', '1px solid rgb(238, 127, 127)');
      $('.dcv').css('border', '1px solid rgb(92, 88, 88)');
      $('.dcl').css('border', '1px solid rgb(92, 88, 88)');
      $('.dcp').css('color', 'rgb(238, 127, 127)');
      $('.dcv').css('color', 'rgb(92, 88, 88)');
      $('.dcl').css('color', 'rgb(92, 88, 88)');
    }else if(name === '.dcv'){
      // initialise pagination also set the dataSource
      $('.dcp').css('border', '1px solid rgb(92, 88, 88)');
      $('.dcv').css('border', '1px solid rgb(238, 127, 127)');
      $('.dcl').css('border', '1px solid rgb(92, 88, 88)');
      $('.dcp').css('color', 'rgb(92, 88, 88)');
      $('.dcv').css('color', 'rgb(238, 127, 127)');
      $('.dcl').css('color', 'rgb(92, 88, 88)');
    }else {
      $('.dcp').css('border', '1px solid rgb(92, 88, 88)');
      $('.dcv').css('border', '1px solid rgb(92, 88, 88)');
      $('.dcl').css('border', '1px solid rgb(238, 127, 127)');
      $('.dcp').css('color', 'rgb(92, 88, 88)');
      $('.dcv').css('color', 'rgb(92, 88, 88)');
      $('.dcl').css('color', 'rgb(238, 127, 127)');
    }
  }
  hidden(action:any, type:any){
    this.form.patchValue({
      categorie: ''
    })
    this.action = 'Valider';
    this.is_add = true;
    if(action === 'hidden'){
      $(document).ready(() => {  
        $('#categorie').css("display", "none");
      }); 
    }else{
      $(document).ready(() => {  
        $('#categorie').css("display", "block");
      }); 
      this.type = type;
    }

  }
  updateBorder(button:any){
    console.log(button);
    $(button).css('border', '1px solid red');
  }
    deleteDepenseCategorie(id:any){
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
          this.store.dispatch(deletDepenseCategorieById({id:id}));
          this.store.dispatch(loadCategoriedepense({idAutoEcole: localStorage.getItem('autoEcole_id')}));
        }
      })
      
    }
    showDepenseCategorieForm(id:any, categorie:any){
      this.is_add = false;
      this.action = 'Modifier';
      this.form.patchValue({
        categorie:categorie
      })
      this.idDepenseCategorie = id;
      $('#categorie').css("display", "block");
    }
    updateDepenseCategorie(id:any){
      if(this.form.invalid){
        console.log("form invalid");
        return;
      }

      let data= {categorie:this.form.value.categorie};
      this.store.dispatch(updateDepenseCategorie({id: this.idDepenseCategorie, data}));
      this.getData();
    }
    open(type:any, btn:any, data:any) {
      const modalRef = this.modalService.open(DepenseCategorieModalComponent);
      modalRef.componentInstance.type = type;
      modalRef.componentInstance.btn = btn;
      modalRef.componentInstance.data = data;
    }
}
