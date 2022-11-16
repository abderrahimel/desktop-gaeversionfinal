import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { StateAbonnement } from 'src/app/state/abonnement/abonnement.state';
import { loadAbonnemtAction } from 'src/app/state/abonnement/abonnemet.action';
@Component({
  selector: 'app-abonnementmodal',
  templateUrl: './abonnementmodal.component.html',
  styleUrls: ['./abonnementmodal.component.css']
})
export class AbonnementmodalComponent implements OnInit {
  @Input() btn: any;
  @Input() data: any;
  submitted:boolean = false;
  form = new FormGroup({           
    prix: new FormControl('', Validators.required),
    date_debut: new FormControl('', Validators.required),
    date_fin: new FormControl('', Validators.required),
  
  });
  constructor( public activeModal: NgbActiveModal,
              private dataServece: DataService,
              private   store: Store<{abonement: StateAbonnement}>,
    ) { }

  ngOnInit(): void {
  
    console.log(this.data);
    if(this.btn !== 'Abonnement'){
      this.form.patchValue({
        prix: this.data?.prix,
        date_debut: this.data?.date_debut,
        date_fin: this.data?.date_fin,
      })
    }
    if(this.btn === 'Abonnement'){
      this.btn = 'Ajouter'
    }
  }

  abonnement(){
    this.submitted = true;
       if(this.form.invalid){
         console.log("form invalid");
         return;
       }
        console.log("update abonnement");
       this.dataServece.updateabonnement(this.data.id, {
        prix: this.form.value.prix,
        date_debut: this.form.value.date_debut,
        date_fin: this.form.value.date_fin,
       }).subscribe(data=>{
         console.log(data);
       })
       this.store.dispatch(loadAbonnemtAction());
       this.activeModal.dismiss('Cross click');
  }
  getAllAbonnement(){
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.abonement.abonnement.loaded){
        this.store.dispatch(loadAbonnemtAction());
      }
    })
   }
}
