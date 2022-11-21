import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { addDepenseCategorie, updateDepenseCategorie } from 'src/app/state/depenseCategorie/depenseCategorie.actions';
import { DepenseCategorieState } from 'src/app/state/depenseCategorie/depenseCategorie.state';
@Component({
  selector: 'app-depense-categorie-modal',
  templateUrl: './depense-categorie-modal.component.html',
  styleUrls: ['./depense-categorie-modal.component.css']
})
export class DepenseCategorieModalComponent implements OnInit {
  @Input() type: any;
  @Input() btn: any;
  @Input() data: any;
  submitted:boolean = false;
  form = new FormGroup({
    categorie: new FormControl('', Validators.required),
  })
  constructor(public activeModal: NgbActiveModal,
              private store:Store<{categorieDepense: DepenseCategorieState}> 
    ) { }

  ngOnInit(): void {
    
      this.form.patchValue({
        categorie: this.data?.categorie
      })
  }
  valider(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    let id_autoEcole = localStorage.getItem('autoEcole_id');
    let data = {
      categorie: this.form.value.categorie,
      type: this.type
    }
    if(this.btn === 'Ajouter'){
      // dispatch action add categorie depense; 
      this.store.dispatch(addDepenseCategorie({idAutoEcole: id_autoEcole,data}))
    }else{
      // dispatch action update categorie depense
      this.store.dispatch(updateDepenseCategorie({id:this.data.id, data }));
      }
      this.activeModal.dismiss('Cross click')

    }
}