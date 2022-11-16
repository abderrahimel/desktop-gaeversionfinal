import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatService } from 'src/app/services/candidat.service';
import { DataService } from 'src/app/services/data.service';
import { loadCourPratique } from 'src/app/state/cours/cour.actions';
import { Store } from '@ngrx/store';
import { CandidatState } from 'src/app/state/candidat/candidat.state';
import { CourState } from 'src/app/state/cours/cour.state';
import { MoniteurState } from 'src/app/state/moniteur/moniteur.state';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-cour-pratique-modal',
  templateUrl: './cour-pratique-modal.component.html',
  styleUrls: ['./cour-pratique-modal.component.css']
})
export class CourPratiqueModalComponent implements OnInit {
  @Input() type: any;
  @Input() btn: any;
  @Input() data: any;
  submitted:boolean = false;
  moniteurPData:any;
  vehiculeData:any;
  candidatData:any;
  vehicule_ecole:any;
  follow_cours_pratique:any = [];
  monitorP_E:any;
  addOrUpdate:any;
  id_auto_ecoleOrCour:any;
  id:any;
  list_candidats:any;
  list_candidat:any = '';
  is_update:boolean = false;
  listCandidat:any = '';
  listCandidatV:any = [];
  presence:any = {}
  listCandidatK:any = [];
  cours_pratique:any;
  candidat_list:any = '';
  candidatS:any; 
  candidatsB:any;
  form = new FormGroup({
    date: new FormControl('', Validators.required),
    date_debut: new FormControl('', Validators.required), 
    date_fin: new FormControl('', Validators.required),
    permis: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    candidat: new FormControl('', Validators.required),
    moniteur_pratique_id: new FormControl('', Validators.required),
    vehicule_id: new FormControl('', Validators.required),
  })
  constructor(public activeModal: NgbActiveModal,
              private candidatService: CandidatService,
              private route: ActivatedRoute,
              private router: Router,
              private dataService: DataService,
              private store:Store<{candidat:CandidatState, cour:CourState, moniteur:MoniteurState}>,
    ) { }

    ngOnInit(): void {
         this.getCandidatsBasic() 
         this.getCandidatsSupplementaire()
   
        this.dataService.getMoniteursP(localStorage.getItem('autoEcole_id')).subscribe(data =>{
          this.monitorP_E = data
          });
          // get vehicule
          this.dataService.getVehicules(localStorage.getItem('autoEcole_id')).subscribe( data =>{
           this.vehicule_ecole = JSON.parse(data);
         });
         // get candidat
     
           this.form.patchValue({
            date: this.data?.date,
            date_debut: this.data?.date_debut,
            date_fin: this.data?.date_fin,
            permis: this.data?.permis,
            type: this.data?.type,
            candidat: this.data?.candidat[0],
            moniteur_pratique_id: this.data?.moniteur_pratique_id,
            vehicule_id: this.data?.vehicule_id,
          });
     
           let courP = this.data;
           if(courP?.candidat.length != 0){
             for(let index = 0; index< courP?.candidat?.length; index++){
               this.follow_cours_pratique += courP?.candidat[index] + ',';
             }
           }
          
        
           this.candidatService.getListCandidat(courP?.candidat).subscribe(data=>{
             this.listCandidat = data
             courP?.candidat.map((val, index) =>{
               this.list_candidat = this.listCandidat;
               let a = `${val}`;
               this.listCandidatV?.push({  val: this.listCandidat?.split(',')[index]});
               this.listCandidatK?.push({key: val});
             })
              })
              
           //
           let id_pr = Number(this.route.snapshot.paramMap.get('id'));
           if(this.data?.id !== undefined){
            this.dataService.getPresencecourPByIdCour(localStorage.getItem('autoEcole_id'), this.data?.id).subscribe(data=>{
              this.presence = JSON.parse(data).presence;
            })
           }
   }
   getCandidatsSupplementaire(){
    this.dataService.getCandidatsSupplementaire(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.candidatS = JSON.parse(data) 
    },
    error=>console.log(error.error) 
    )
  }  
  getCandidatsBasic(){
    this.dataService.getCandidatsBasic(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.candidatsB = JSON.parse(data)  
    },
    error=>console.log(error.error)
    )
  }  
   reloadData(){
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.cour.cours.coursPratique.loaded){
        this.store.dispatch(loadCourPratique({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
    })  
   }
   handleError(error:any){
    console.log(error)
  }
  addCours_pratique(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    let auto_id = localStorage.getItem('autoEcole_id');
    if(this.btn !== 'Ajouter'){
        
        this.dataService.updatecourpratique(localStorage.getItem('autoEcole_id'), this.data.id,
        {
          date: this.form.value.date,
          date_debut: this.form.value.date_debut,
          date_fin: this.form.value.date_fin,
          permis: this.form.value.permis,
          type: this.form.value.type,
          candidat: this.follow_cours_pratique,
          moniteur_pratique_id: this.form.value.moniteur_pratique_id,
          vehicule_id: this.form.value.vehicule_id,
          presence: this.presence
        }
        ).subscribe(data => {
        },
          error => this.handlerror(error)
        )
    }else{
      this.dataService.adCourPratique(localStorage.getItem('autoEcole_id'),
        {
          date: this.form.value.date,
          date_debut: this.form.value.date_debut,
          date_fin: this.form.value.date_fin,
          permis: this.form.value.permis,
          type: this.form.value.type,
          candidat: this.follow_cours_pratique,
          moniteur_pratique_id: this.form.value.moniteur_pratique_id,
          vehicule_id: this.form.value.vehicule_id,
          presence: this.presence
        }
        ).subscribe(data => {
        },
          error => this.handlerror(error)
        )
    }
    this.store.dispatch(loadCourPratique({idAutoEcole: localStorage.getItem('autoEcole_id')}));
    this.activeModal.dismiss('Cross click');
  }

  handlerror(error:any){
      console.log(error);
  }
  
  add_to_list(e:any){
      // add candidat to list presence
      if(!this.follow_cours_pratique.includes(e.target.value)){
        this.presence[e.target.value] = 'A';
        // get candidat that selected
        this.candidatService.getCandidatById(e.target.value).subscribe((data:any) =>{
           // data.nom_fr + " " + prenom_fr
           this.candidat_list +=  data.nom_fr + " " + data.prenom_fr + ", ";
           this.listCandidat +=  data.nom_fr + " " + data.prenom_fr + ", ";
           });
           //  add id of the candidat to list id candidats inscrit in this cours
           this.follow_cours_pratique += e.target.value + ',';

         }
   }
}
