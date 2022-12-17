import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { DataService } from 'src/app/services/data.service';
import { TranslationService } from 'src/app/services/translation.service';
import { loadassurance } from 'src/app/state/assurance/assurance.actions';
import { AssuranceState } from 'src/app/state/assurance/assurance.state';
import { AutoEcoleState } from 'src/app/state/autoEcole/autoEcole.state';
import { loadViheculeAction } from 'src/app/state/vehicule/vehicule.actions';
import { loadvidange } from 'src/app/state/vidange/vidange.actions';
import { VidangeState } from 'src/app/state/vidange/vidange.state';
import { loadvisiteTechnique } from 'src/app/state/visiteTechnique/visiteTechnique.actions';
import { VisiteTechniqueState } from 'src/app/state/visiteTechnique/visiteTechnique.state';
@Component({
  selector: 'app-vehicule-modal',
  templateUrl: './vehicule-modal.component.html',
  styleUrls: ['./vehicule-modal.component.css']
})
export class VehiculeModalComponent implements OnInit {
  @Input() btn: any;
  @Input() data: any;
  show:boolean = true;
  submitted:boolean = false;
  base64Img_cart:any;
  base64Img_image_assurance:any;
  base64Img_visite:any; 
  base64Img_vignette:any;
  id:any;
  autoecol:any;
  updateOrAdd:any;
  is_update:any;
  form:any;
  setForm:any;
  vehiculeData:any;
  id_autoecole_or_vehicule:any;
  
  constructor( public activeModal: NgbActiveModal,
              private translateService: TranslationService, 
              private dataservice: DataService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<{autoEcole: AutoEcoleState, visiteTechnique:VisiteTechniqueState, vidange:VidangeState, assurance:AssuranceState}>
    ) { }
    ngOnInit(): void {
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      if(this.btn === 'Modifier'){
        this.id_autoecole_or_vehicule = Number(this.route.snapshot.paramMap.get('id'));
        this.form = new FormGroup({
          matricule:new FormControl('', Validators.required),
          type:new FormControl('', Validators.required),
          marque :new FormControl('', Validators.required),
          fourniseur:new FormControl('', Validators.required),
          modele:new FormControl('', Validators.required),
          categorie:new FormControl('', Validators.required),
          date_visite:new FormControl('', Validators.required),
          date_prochain_visite:new FormControl('', Validators.required),
          date_vidange:new FormControl('', Validators.required),
          date_prochain_vidange:new FormControl('', Validators.required),
          date_assurance:new FormControl('', Validators.required),
          date_expiration_assurance:new FormControl('', Validators.required),
          carte_grise:new FormControl(''),
          vignette:new FormControl(''),
          assurance:new FormControl(''),
          visite:new FormControl(''), 
        });

      }else if(this.btn === 'detail'){
        this.show = false;
        this.form = new FormGroup({
          matricule:new FormControl(''),
          type:new FormControl(''),
          marque :new FormControl(''),
          fourniseur:new FormControl(''),
          modele:new FormControl(''),
          categorie:new FormControl(''),
          date_visite:new FormControl(''),
          date_prochain_visite:new FormControl(''),
          date_vidange:new FormControl(''),
          date_prochain_vidange:new FormControl(''),
          date_assurance:new FormControl(''),
          date_expiration_assurance:new FormControl(''),
          carte_grise:new FormControl(''),
          vignette:new FormControl(''),
          assurance:new FormControl(''),
          visite:new FormControl(''), 
        });
      
  
      }else{
        this.id_autoecole_or_vehicule = localStorage.getItem('autoEcole_id');
        this.form = new FormGroup({
          matricule:new FormControl('', Validators.required),
          type:new FormControl('', Validators.required),
          marque :new FormControl('', Validators.required),
          fourniseur:new FormControl('', Validators.required),
          modele:new FormControl('', Validators.required),
          categorie:new FormControl('', Validators.required),
          date_visite:new FormControl('', Validators.required),
          date_prochain_visite:new FormControl('', Validators.required),
          date_vidange:new FormControl('', Validators.required),
          date_prochain_vidange:new FormControl('', Validators.required),
          date_assurance:new FormControl('', Validators.required),
          date_expiration_assurance:new FormControl('', Validators.required),
          carte_grise:new FormControl('', Validators.required),
          vignette:new FormControl('', Validators.required),
          assurance:new FormControl('', Validators.required),
          visite:new FormControl('', Validators.required),
        });
      }
      this.form.patchValue({
        matricule: this.data?.matricule,
        type: this.data?.type,
        marque: this.data?.marque,
        fourniseur: this.data?.fourniseur,
        modele: this.data?.modele,
        categorie: this.data?.categorie,
        date_visite: this.data?.date_visite,
        date_prochain_visite: this.data?.date_prochain_visite,
        date_vidange: this.data?.date_vidange,
        date_prochain_vidange: this.data?.date_prochain_vidange,
        date_assurance: this.data?.date_assurance,
        date_expiration_assurance: this.data?.date_expiration_assurance,
      });
    
    }
  
    AddOrModifierVehicule(){
      this.submitted = true;
      if(this.form.invalid){
        return;
      }
     if(this.btn === 'Ajouter'){
      this.dataservice.advehicule(localStorage.getItem('autoEcole_id'), {
        matricule: this.form.value.matricule,
        type: this.form.value.type,
        marque: this.form.value.marque,
        fourniseur: this.form.value.fourniseur,
        modele: this.form.value.modele,
        categorie: this.form.value.categorie,
        date_visite: this.form.value.date_visite,
        date_prochain_visite: this.form.value.date_prochain_visite,
        date_vidange: this.form.value.date_vidange,
        date_prochain_vidange: this.form.value.date_prochain_vidange,
        date_assurance: this.form.value.date_assurance,
        date_expiration_assurance: this.form.value.date_expiration_assurance,
        vignette:this.base64Img_vignette, 
        visite:this.base64Img_visite,
        assurance: this.base64Img_image_assurance,
        carte_grise: this.base64Img_cart
       }).subscribe(data => {
        this.store.dispatch(loadViheculeAction({id: localStorage.getItem('autoEcole_id')}));
        this.store.dispatch(loadvisiteTechnique({idAuto: localStorage.getItem('autoEcole_id')}));
        this.store.dispatch(loadvidange({idAuto: localStorage.getItem('autoEcole_id')}));
        this.store.dispatch(loadassurance({idAuto: localStorage.getItem('autoEcole_id')}));
      },
         error => this.handlerror(error)
      ) 
     }else{
      this.dataservice.upvehicule(this.data?.id, {
        matricule: this.form.value.matricule,
        type: this.form.value.type,
        marque: this.form.value.marque,
        fourniseur: this.form.value.fourniseur,
        modele: this.form.value.modele,
        categorie: this.form.value.categorie,
        date_visite: this.form.value.date_visite,
        date_prochain_visite: this.form.value.date_prochain_visite,
        date_vidange: this.form.value.date_vidange,
        date_prochain_vidange: this.form.value.date_prochain_vidange,
        date_assurance: this.form.value.date_assurance,
        date_expiration_assurance: this.form.value.date_expiration_assurance,
        vignette:this.base64Img_vignette, 
        visite:this.base64Img_visite,
        assurance: this.base64Img_image_assurance,
        carte_grise: this.base64Img_cart
       }).subscribe(data => {
        this.store.dispatch(loadViheculeAction({id: localStorage.getItem('autoEcole_id')}));
        this.store.dispatch(loadvisiteTechnique({idAuto: localStorage.getItem('autoEcole_id')}));
        this.store.dispatch(loadvidange({idAuto: localStorage.getItem('autoEcole_id')}));
        this.store.dispatch(loadassurance({idAuto: localStorage.getItem('autoEcole_id')}));
      },
         error => this.handlerror(error)
      ) 
     }
     this.activeModal.dismiss('Cross click');
  }
  handlerror(error:any){
    console.log(error);
  }
  
  fileChangeEvent(fileInput: any, keyImage:any) {
  
    if (fileInput.target.files && fileInput.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                    const imgBase64Path = e.target.result;
                    if(keyImage === 'cart'){
                       this.base64Img_cart = imgBase64Path;
                    }else if(keyImage === 'assurance'){
                      this.base64Img_image_assurance = imgBase64Path;
                    }else if(keyImage === 'visite'){
                      this.base64Img_visite  = imgBase64Path;
                    } else{
                      this.base64Img_vignette = imgBase64Path;
                    }
                    
            };
        };
  
        reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

}
