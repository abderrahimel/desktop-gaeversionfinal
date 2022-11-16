import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { candidatStart } from 'src/app/state/candidat/candidat.actions';
import { CandidatState } from 'src/app/state/candidat/candidat.state';
import { addfactures, loadfactures, updatefactures } from 'src/app/state/factures/factures.actions';
import { FactureState } from 'src/app/state/factures/factures.state';

@Component({
  selector: 'app-facturation-form',
  templateUrl: './facturation-form.component.html',
  styleUrls: ['./facturation-form.component.css']
})
export class FacturationFormComponent implements OnInit {
  submitted:any = false;
  data:any;
  factureData:any;
  candidats:any;
  action:any;
  idFacture:any;
  is_add:any;
  idAutoEcole:any;
  candidatsB:any; 
  candidatS:any;
  id_auto_facture:any;
  dateVal = new Date();   
  form = new FormGroup({ 
    date: new FormControl('', Validators.required),
    candidat_id: new FormControl('', Validators.required),
    tva: new FormControl('', Validators.required),
    montant_ttc: new FormControl('', Validators.required),
    montant_ht: new FormControl('', Validators.required),
    remarque: new FormControl('', Validators.required),
  })
  constructor(private dataService: DataService,
              private router: Router,    
              private route: ActivatedRoute,
              private store:Store<{candidat: CandidatState, facture: FactureState}>       
    ) { }

  ngOnInit(): void {
    this.idAutoEcole = localStorage.getItem('autoEcole_id');
    this.idFacture = Number(this.route.snapshot.paramMap.get('id'));
    this.getData();
    if(this.router.url === '/update-facture/' + this.idFacture){
      this.action = "Modifier";
      this.is_add = false;
      this.dataService.getFactureById(this.idFacture).subscribe(data =>{
          this.factureData = data;
          this.form.patchValue({
            date: this.factureData.date,
            candidat_id: this.factureData.candidat_id,
            tva: this.factureData.tva,
            montant_ttc: this.factureData.montant_ttc,
            montant_ht: this.factureData.montant_ht,
            remarque: this.factureData.remarque,
          });
      })
    }else{
      this.action = "Ajouter";
      this.is_add = true;
    }

  }
  getData(){
      this.store.pipe(take(1)).subscribe(store=>{
        if(!store.candidat.candidat.loaded){
          this.store.dispatch(candidatStart({idAutoEcole: this.idAutoEcole}));
        }
        if(!store.facture.factures.loaded){
          this.store.dispatch(loadfactures({idAutoEcole: this.idAutoEcole}));
        }
      })
      this.store.select(state=>state.candidat.candidat).subscribe(candidats=>{
        this.candidatsB = candidats.candidatBasic; 
        this.candidatS  = candidats.candidatSupplementaire;
      });
    
  }
  add_orUpdatefacture(){
    this.submitted = true; 
    if(this.form.invalid){
      console.log("form invalid ");
      return;
    }
    let data =  {
      date: this.form.value.date,
      candidat_id: this.form.value.candidat_id,
      tva: this.form.value.tva,
      montant_ttc: this.form.value.montant_ttc,
      montant_ht: this.form.value.montant_ht,
      remarque: this.form.value.remarque,
    }
    if(this.is_add){ // addfactures updatefactures
      // dispatch action to add facture
      this.store.dispatch(addfactures({idAutoEcole: this.idAutoEcole, data: data}))
    }else{
      // dispatch action to update facture
      this.store.dispatch(updatefactures({id: this.idFacture, data: data}))
    }
  }
  

}