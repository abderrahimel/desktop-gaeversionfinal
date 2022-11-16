import { Component, OnInit } from '@angular/core';
import { Vehicules } from 'src/app/classes/vehicules';
import { DataService } from 'src/app/services/data.service';
import { TranslationService } from 'src/app/services/translation.service';
import { FormBuilder,FormGroup, FormControl, Validators, MaxLengthValidator } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatService } from 'src/app/services/candidat.service';
import { ThisReceiver } from '@angular/compiler';
import { AnyFn } from '@ngrx/store/src/selector';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-presence-pratique-form',
  templateUrl: './presence-pratique-form.component.html',
  styleUrls: ['./presence-pratique-form.component.css']
})
export class PresencePratiqueFormComponent implements OnInit {
  vhcl = new Vehicules();
  submitted:any = false;
  base64Img_cart:any;
  base64Img_image_assurance:any;
  base64Img_visite:any;
  id:any;
  updateOrAdd:any;
  is_update:any;
  presencePratique:any;
  presenceCour:any
  cour:any
  candidats:any = [];
  candidatList:any;
  checked:boolean = false;
  presenceData:any;
  idMoniteur:any;
  checkedorNot:any ={}
  can:any;
  idPP:any;
  present:any = {}
  id_autoecole_or_vehicule:any;
  form = new FormGroup({
    heure_debut:new FormControl('', Validators.required),
    heure_fin:new FormControl('', Validators.required),
    moniteur_pratique_id :new FormControl('', Validators.required),
    categorie:new FormControl('', Validators.required),
  });
  dateVal = new Date();
   constructor(private translateService: TranslationService, 
               private dataservice: DataService,
               private router: Router,
               private route: ActivatedRoute,
               private candidatService:CandidatService,
               private auth:AuthService
           ) {
   }
 
   ngOnInit(): void {
    this.translateService.applyLanguage();

    this.auth.authStatus.subscribe(value=>{
      if(value){
        this.id = Number(this.route.snapshot.paramMap.get('id'));
     
        let ecole_id = localStorage.getItem('autoEcole_id');
        this.dataservice.getPresencecourPByIdCour(ecole_id, this.id).subscribe(data=>{
         this.presenceCour = JSON.parse(data);
         
         this.idPP = this.presenceCour.id;
         this.candidatList = this.presenceCour.candidat;
   
         this.checkedorNot = this.presenceCour.presence;
        
         if(this.presenceCour.presence){
           this.present = this.presenceCour.presence;
         }
       })
        //
        this.dataservice.getCourPById(this.id).subscribe(data=> {
                 this.cour = data;
                 this.presencePratique = data;
                 if(this.idPP)
                 this.can =this.presencePratique.candidat
                 this.dataservice.getMoniteurpById(this.cour.moniteur_pratique_id).subscribe(data=>{
                   let moniteurr = data;
                   this.idMoniteur = this.cour.moniteur_pratique_id;
                    this.form.patchValue({
                     heure_debut: this.cour.date_debut,
                     heure_fin: this.cour.date_fin,
                     moniteur_pratique_id : data['employe'].nom + " " + data['employe'].prenom,
                     categorie: this.cour.permis,
                    });
                  })
                 let item = this.cour.candidat;
                 let obj = {}
                 if(!this.checkedorNot){
                   for(let i= 0; i<item.length; i++){
                     let key = item[i];console.log(key);
                     obj[item[i]] = "A";
                     this.checkedorNot = obj;
                   }
                 }
                 if(!this.presencePratique.presence){
                   this.present = this.checkedorNot;
                 }
                 for(let i= 0; i<item.length; i++){
                   this.candidatService.getCandidatById(item[i]).subscribe(data=>{
                     let candidat = data;
                     this.candidats.push([item[i], data['nom_fr'] + " " + data['prenom_fr']])
                   })
               }
               
   
        })
      }
     })

   }

   AjoutePresence(){
     this.submitted = true;
     if(this.form.invalid){
       return;
     } 
    let auto_id = 1;
    let add;
    let id;
    if(this.presenceCour.id){
       add = true;
       id = this.presenceCour.id;
    }else{
      add = false;
      id = this.cour.id;
    }
      
 }
 handlerror(error:any){
   console.log(error);
 }
 checkBoxValue(event:any, id:any){
  if(event.target.checked){
   this.present[id] = "P";
  }else{
   this.present[id] = "A";
  }
  if(!this.can.includes(id)){
    this.can.push(id);
  }
 }
 }