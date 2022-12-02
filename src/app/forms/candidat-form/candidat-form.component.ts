import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CandidatService } from '../../services/candidat.service'
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AutoEcoleState } from 'src/app/state/autoEcole/autoEcole.state';
import { loadViheculeAction, loadViheculeToStore } from 'src/app/state/vehicule/vehicule.actions';
import { UserState } from 'src/app/state/user/user.state';
import { addUser } from 'src/app/state/user/user.actions';
import { VehiculeState } from 'src/app/state/vehicule/vehicule.state';
import { MoniteurState } from 'src/app/state/moniteur/moniteur.state';
import { loadMoniteurP, loadMoniteurPtoStore, loadMoniteurT, loadMoniteurToStore } from 'src/app/state/moniteur/moniteur.actions';
import { take } from 'rxjs/operators';
import { CandidatState } from 'src/app/state/candidat/candidat.state';
import { candidatStart, creatnewcandidat, updatecandidat } from 'src/app/state/candidat/candidat.actions';

declare var $: any;
@Component({
  selector: 'app-candidat-form',
  templateUrl: './candidat-form.component.html',
  styleUrls: ['./candidat-form.component.css']
})
export class CandidatFormComponent implements OnInit {
  submitted:any;
  public error:any = [];
  files:any;
  possed:any = false;
  email_exist_in_data_base:any = '';
  base64Img_image:any;
  confirm_password:any = false;
  dateVal = new Date();
  dataVehicules:any;
  id_auto_ecole:any;
  user_data:any;
  idCandidat:any;
  candidatData:any;
  idAutoEcole:any;
  data:any;
  
  user:any;
  monitorP_E:any;
  monitorT_E:any;
  vehiculeData:any;
  id_matricule:any;
  vehicule_ecole:any;
  modifierUpdate:any;
  form:any;
  autoecol:any;
  call:boolean = false;
  cin:any;
  id_ecoleOrCandidat:any;
  is_update:any;
  constructor(private translateService: TranslationService,
              private router: Router,
              private candidatService: CandidatService,
               private dataservice:DataService,
               private _auth:AuthService,
               private route: ActivatedRoute,
               private store:Store<{autoEcole:AutoEcoleState, user: UserState, vehicule:VehiculeState, moniteur:MoniteurState, candidat: CandidatState}>
               ) { }
  
  ngOnInit(): void {
    this._auth.authStatus.subscribe(value=>{
          this.getData()
    })
  }
 getData(){
  this.setForm();
  this.store.pipe(take(1)).subscribe(store=>{
    if(!store.user.user.loaded){ this.getUser();} 
  })
 
  this.store.pipe(take(1)).subscribe(store=>{
    if(!store.moniteur.moniteur.moniteurTheorique.loaded){ 
      this.store.dispatch(loadMoniteurT({idAutoEcole: localStorage.getItem('autoEcole_id')}));
    }
    //
    if(!store.moniteur.moniteur.moniteurPratique.loaded){
      this.dataservice.getMoniteurP(localStorage.getItem('autoEcole_id')).subscribe(mp =>{
        this.store.dispatch(loadMoniteurP({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      });
    }
    if(!store.vehicule.vehicule.loaded){  
      this.dataservice.getVehicules(localStorage.getItem('autoEcole_id')).subscribe(v =>{
        this.store.dispatch(loadViheculeAction({id: localStorage.getItem('autoEcole_id')}));
      })
      
    }
    if(!store.candidat.candidat.loaded){
      this.store.dispatch(candidatStart({idAutoEcole: localStorage.getItem('autoEcole_id')}));
    }
  })

  // select moniteur theorique
  this.store.select(state=>state.moniteur.moniteur.moniteurTheorique.moniteurTheorique).subscribe(mt=>{
    this.monitorT_E = mt;
  });
   // select moniteur pratique
   this.dataservice.getMoniteurP(localStorage.getItem('autoEcole_id')).subscribe(data=>{
    this.monitorP_E =  data;
   })
  // select vehicule 
  this.store.select(state=>state.vehicule.vehicule.vehicule).subscribe(v => this.vehicule_ecole = v);

  this.idCandidat = Number(this.route.snapshot.paramMap.get('id'));                                     
    if(this.router.url === '/candidat/' + this.idCandidat){
      this.is_update = true;
      this.modifierUpdate = "Modifier"; 
      this.id_ecoleOrCandidat = this.idCandidat; 
     
    }else{
      this.is_update = false;
      this.modifierUpdate = "Ajouter";
      this.id_ecoleOrCandidat = localStorage.getItem('autoEcole_id');
    }
    
   this.candidatService.getCandidatById(this.idCandidat).subscribe(data =>{
          this.candidatData = data;
          this.form.patchValue({
            cin: this.candidatData.cin,
            date_inscription: this.candidatData.date_inscription,
            numero_contrat: this.candidatData.numero_contrat,
            ref_web: this.candidatData.ref_web,
            nom_fr: this.candidatData.nom_fr,
            nom_ar: this.candidatData.nom_ar,
            lieu_obtention_fr: this.candidatData.lieu_obtention_fr,
            prenom_fr: this.candidatData.prenom_fr,
            prenom_ar: this.candidatData.prenom_ar,
            date_naissance: this.candidatData.date_naissance,
            lieu_naissance:  this.candidatData.lieu_naissance,
            adresse_fr: this.candidatData.adresse_fr,
            adresse_ar: this.candidatData.adresse_ar,
            telephone: this.candidatData.telephone,
            email: this.candidatData.email,
            pcn: this.candidatData.pcn,
            lieu_obtention_ar: this.candidatData.lieu_obtention_ar,
            date_obtention: this.candidatData.date_obtention,
            profession: this.candidatData.profession,
            possede_permis: this.candidatData.possede_permis,
            langue: this.candidatData.langue,
            commercial: this.candidatData.commercial,
            date_fin_contrat: this.candidatData.date_fin_contrat,
            categorie_demandee: this.candidatData.categorie_demandee,
            montant: this.candidatData.montant,
            nbr_heur_pratique: this.candidatData.nbr_heure_pratique,
            nbr_heur_theorique: this.candidatData.nbr_heure_theorique,
            moniteur_theorique_id: this.candidatData.moniteur_theorique_id,
            moniteur_pratique_id: this.candidatData.moniteur_pratique_id,
            vehicule_id: this.candidatData.vehicule_id,
            observations: this.candidatData.observations,
            permis: this.candidatData.possede_permis,
            type_formation: this.candidatData.type_formation
          });
   })
 }
  setForm(){
    
    this.form = new FormGroup({
      cin: new FormControl('', [Validators.required]),
      date_inscription: new FormControl('', Validators.required),
      numero_contrat: new FormControl('', Validators.required),
      ref_web: new FormControl('', Validators.required),
      nom_fr: new FormControl('', Validators.required),
      nom_ar: new FormControl('', Validators.required),
      prenom_fr: new FormControl('', Validators.required),
      prenom_ar: new FormControl('', Validators.required),
      date_naissance: new FormControl('', Validators.required),  
      lieu_naissance:  new FormControl('', Validators.required),
      adresse_fr: new FormControl('', Validators.required ),
      adresse_ar: new FormControl('', Validators.required),
      telephone: new FormControl('',[Validators.required, Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')]),
      email: new FormControl('', Validators.required),
      profession: new FormControl('', Validators.required),
      langue:new FormControl('', Validators.required),
      image: new FormControl(''),
      // commercial: new FormControl(''),
      date_fin_contrat: new FormControl('',Validators.required),
      type_formation: new FormControl('',Validators.required),
      categorie_demandee: new FormControl('', Validators.required),
      montant: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      nbr_heur_pratique: new FormControl('',[ Validators.required, Validators.pattern("^[0-9]*$")]),
      nbr_heur_theorique: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      moniteur_theorique_id: new FormControl('', Validators.required),
      moniteur_pratique_id: new FormControl('', Validators.required),
      vehicule_id: new FormControl('', Validators.required),
      observations: new FormControl(''),  //
      possede_permis: new FormControl('', Validators.required),
      pcn: new FormControl(''),
      date_obtention: new FormControl(''),
      lieu_obtention_fr: new FormControl(''),
      lieu_obtention_ar: new FormControl(''),
    });
  }

  async getUser(){
    try {
      const resUser:any =  await this._auth.getUser().toPromise();
      let user = {
        id:    resUser?.id,
        login: resUser?.login,
        email: resUser?.email,
        name:  resUser?.name,
        type:  resUser?.type
        };
        this.store.dispatch(addUser({payload: user}));
    } catch (error) {
    }
    
  }

  async getMoniteurP(){
    const resMoniteurP:any =  await this.dataservice.getMoniteurP(localStorage.getItem('autoEcole_id')).toPromise();
    this.store.dispatch(loadMoniteurPtoStore({payload: resMoniteurP}))
  }
  async getMoniteurT(){ 
    const resMoniteurT:any =  await this.dataservice.getMoniteurT(localStorage.getItem('autoEcole_id')).toPromise();
    this.store.dispatch(loadMoniteurToStore({payload: this.monitorT_E}));
  }
  async getVehicule(){ 
    const resVehicule:any =  await this.dataservice.getVehicules(localStorage.getItem('autoEcole_id')).toPromise();
    this.store.dispatch(loadViheculeToStore({payload: JSON.parse(resVehicule)}));
  }
  fileChangeEvent(fileInput: any, keyImage:any) {

        if (fileInput.target.files && fileInput.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const image = new Image();
                image.src = e.target.result;
                image.onload = rs => {
                        const imgBase64Path = e.target.result;
                        this.base64Img_image = imgBase64Path;
                        
                      
                        
                };
            };
    
            reader.readAsDataURL(fileInput.target.files[0]);
        }
    }
   
    AddOrUpdateCandidat(){
      this.submitted = true;
      if(this.form.invalid){
        return ;
      }
      let formData = new FormData();
       let data = {
        cin:this.form.value.cin,
        image:this.base64Img_image,
        date_inscription: this.form.value.date_inscription,
        numero_contrat: this.form.value.numero_contrat,
        ref_web: this.form.value.ref_web,
        nom_fr: this.form.value.nom_fr,
        nom_ar: this.form.value.nom_ar,
        lieu_obtention_fr: this.form.value.lieu_obtention_fr,
        prenom_fr: this.form.value.prenom_fr,
        prenom_ar: this.form.value.prenom_ar,
        date_naissance: this.form.value.date_naissance,
        lieu_naissance:  this.form.value.lieu_naissance,
        adresse_fr: this.form.value.adresse_fr,
        adresse_ar: this.form.value.adresse_ar,
        telephone: this.form.value.telephone,
        email: this.form.value.email,
        pcn: this.form.value.pcn,
        lieu_obtention_ar: this.form.value.lieu_obtention_ar,
        date_obtention: this.form.value.date_obtention,
        profession: this.form.value.profession,
        possede_permis: this.form.value.possede_permis,
        langue: this.form.value.langue,
        date_fin_contrat: this.form.value.date_fin_contrat,
        type_formation: this.form.value.type_formation,
        categorie_demandee: this.form.value.categorie_demandee,
        montant: this.form.value.montant,
        nbr_heur_pratique: this.form.value.nbr_heur_pratique,
        nbr_heur_theorique: this.form.value.nbr_heur_theorique,
        moniteur_theorique_id: this.form.value.moniteur_theorique_id,
        moniteur_pratique_id: this.form.value.moniteur_pratique_id,
        vehicule_id: this.form.value.vehicule_id,
        observations: this.form.value.observations,
        permis: this.form.value.permis,
      };

       if(this.is_update){
          this.store.dispatch(updatecandidat({id: this.id_ecoleOrCandidat, data: data}));

       }else{
        this.store.dispatch(creatnewcandidat({idautoecole: localStorage.getItem('autoEcole_id'), data}));
       }
    }
    oui_non(e:any){
          if(e.target.value === 'oui'){
              this.possed = true;
          } else{
             this.possed = false;
          }
    }
    saveimg(event:any){
      this.files = event.target.files[0];
      
    }
  
    handleError(error:any){
      
    }


}
