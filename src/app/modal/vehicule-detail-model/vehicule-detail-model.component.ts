import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { DataService } from 'src/app/services/data.service';
import { TranslationService } from 'src/app/services/translation.service';
import { AutoEcoleState } from 'src/app/state/autoEcole/autoEcole.state';
import { loadViheculeAction } from 'src/app/state/vehicule/vehicule.actions';
@Component({
  selector: 'app-vehicule-detail-model',
  templateUrl: './vehicule-detail-model.component.html',
  styleUrls: ['./vehicule-detail-model.component.css']
})
export class VehiculeDetailModelComponent implements OnInit {
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
              private store: Store<{autoEcole: AutoEcoleState}>
    ) { }
    ngOnInit(): void {
      this.id = Number(this.route.snapshot.paramMap.get('id'));
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
  



}