import { Component, OnInit } from '@angular/core';
import { Vehicules } from 'src/app/classes/vehicules';
import { DataService } from 'src/app/services/data.service';
import { TranslationService } from 'src/app/services/translation.service';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatService } from 'src/app/services/candidat.service';
import { Store } from '@ngrx/store';
import { presencecourState } from 'src/app/state/presencecours/presencecours.state';
import { take } from 'rxjs/operators';
import { loadPresencecourTheorique } from 'src/app/state/presencecours/presencecours.actions';
import { CourState } from 'src/app/state/cours/cour.state';
import { loadCourTheorique } from 'src/app/state/cours/cour.actions';

@Component({
  selector: 'app-presence-form',
  templateUrl: './presence-form.component.html',
  styleUrls: ['./presence-form.component.css']
})
export class PresenceFormComponent implements OnInit {
  vhcl = new Vehicules();
  submitted:any = false;
  base64Img_cart:any;
  base64Img_image_assurance:any;
  base64Img_visite:any;
  id:any;
  updateOrAdd:any;
  is_update:any;
  cour:any
  candidats:any = [];
  is_null:any;
  can:any;
  checked:boolean = false;
  presenceData:any;
  idMoniteur:any;
  presenceTheorique:any;
  present:any = {};
  checkedorNot:any;
  id_autoecole_or_vehicule:any;
  form = new FormGroup({
    heure_debut:new FormControl('', Validators.required),
    heure_fin:new FormControl('', Validators.required),
    moniteur_theorique_id :new FormControl('', Validators.required),
    categorie:new FormControl('', Validators.required),
  });
  dateVal = new Date();
   constructor(private translateService: TranslationService, 
               private dataservice: DataService,
               private router: Router,
               private route: ActivatedRoute,
               private candidatService:CandidatService,
               private store: Store<{presencecour: presencecourState, cour:CourState}>
           ) {
   }
 
   ngOnInit(): void {
     this.translateService.applyLanguage();
     this.getData();
     this.id = Number(this.route.snapshot.paramMap.get('id'));
       console.log("id cour theorique");
       console.log(this.id); 
       let id_autoEcole = localStorage.getItem('autoEcole_id');
     this.dataservice.getPresenceTByCour(this.id, id_autoEcole).subscribe(data=>{
       console.log("presence theorique");
       this.presenceTheorique = JSON.parse(data);
       console.log(this.presenceTheorique);
       if(this.presenceTheorique!= null){
        this.checkedorNot = this.presenceTheorique.presence;
        this.present = this.presenceTheorique.presence;
       }
       console.log("presence candidatsssss");
       console.log(this.presenceTheorique);
       
       console.log("presence from data");
       console.log(this.present);
     })
     console.log(this.id);
     this.dataservice.getCourTById(this.id).subscribe(data=> {
              this.cour = JSON.parse(data);
              console.log("cours theorique");
              console.log(this.cour);
              this.can = this.cour.candidat;
              console.log('candidatgfhgfhgfgfgfgfgfgfgfgfgfgfgfgfgfgfgf');
              console.log(this.can);
              this.dataservice.getMoniteurtById(this.cour.moniteur_theorique_id).subscribe(data=>{
                console.log("moniteur theorique");
                console.log(data);
                let moniteurr = data;
                this.idMoniteur = this.cour.moniteur_theorique_id;
                this.form.patchValue({
                  heure_debut: this.cour.date_debut,
                  heure_fin:   this.cour.date_fin,
                  moniteur_theorique_id : data['employe'].nom + " " + data['employe'].prenom,
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
                  console.log(this.checkedorNot);
                }
              }
              if(this.presenceTheorique != null){
                this.present = this.checkedorNot;
              }
              
              console.log(item);
              for(let i= 0; i<item.length; i++){
                this.candidatService.getCandidatById(item[i]).subscribe(data=>{
                  console.log("candidat, ", item[i]);
                  console.log(data['nom_fr']);
                  let candidat = data;
                  this.candidats.push([item[i], data['nom_fr'] + " " + data['prenom_fr'], ])
                 
                  console.log("cndidaaaats******************************************************");
                  console.log(this.candidats);
                })
            }
            

     })
     
   }
   getData(){
      this.store.pipe(take(1)).subscribe(store =>{
        if(!store.presencecour.presencecourstheorique.loaded){
           this.store.dispatch(loadPresencecourTheorique({idAutoEcole: localStorage.getItem('autoEcole_id')}));
        }
        if(!store.cour.cours.coursTheorique.loaded){
           this.store.dispatch(loadCourTheorique({idAutoEcole: localStorage.getItem('autoEcole_id')}));
        }
      })

   }

   AjoutePresence(){
     this.submitted = true;
     if(this.form.invalid){
       console.log("form invalid");
       return;
     } 
    
    let modifier;
    let id;
    if(this.presenceTheorique.id!= null){
      modifier = true;
       id = this.presenceTheorique.id;
       console.log("id presence cours theorique ", id);
    }else{
      modifier = false;
      id = this.cour.id;
    }
    console.log(id, modifier);
    // this.dataservice.ModifierPresenceCourTheorique(modifier, id,{
      // presence: this.present,
      // candidat: this.can
    // }).subscribe(data=>{
      // console.log(data);
      // this.router.navigateByUrl('/listes-cours'); 

    // },
    // error => this.handlerror(error)
    // )
      
 }
 handlerror(error:any){
   console.log("there is an error about send data presence theorique");
   console.log(error);
 }
 checkBoxValue(event:any, id:any){
  console.log(this.can);
   console.log(this.present);
  //  console.log("is_checked: "+event.target.checked);
  //  console.log(id);
  //  if(event.target.checked){
  //   this.present[id] = "P";
  //  }else{
  //   this.present[id] = "A";
  //  }
  //  if(!this.can.includes(id)){
  //   this.can.push(id);
  // }
  // console.log(this.can);
  //  console.log(this.present);
 }
 }