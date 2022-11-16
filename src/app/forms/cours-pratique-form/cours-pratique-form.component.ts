import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { DataService } from 'src/app/services/data.service';
import { CandidatService } from 'src/app/services/candidat.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cours-pratique-form',
  templateUrl: './cours-pratique-form.component.html',
  styleUrls: ['./cours-pratique-form.component.css']
})
export class CoursPratiqueFormComponent implements OnInit {
  dateVal = new Date();
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
  submitted:any = false;
  candidat_list:any = '';
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
  constructor(private translateService: TranslationService,
              private dataService: DataService,
              private candidatService: CandidatService,
              private route: ActivatedRoute,
              private router: Router
    ) { }

  ngOnInit(): void {
     this.id = Number(this.route.snapshot.paramMap.get('id'));
     this.translateService.applyLanguage();
     console.log(this.router.url.slice(0, -1));
     if(this.router.url === '/update-cours-pratique/'+this.id){
       this.is_update = true;
        this.addOrUpdate = "Modifier"
        console.log(this.id);
        this.dataService.getCourPById(this.id).subscribe((data:any)=>{
          console.log("cour pratique");console.log(data);
          let courP = data;
          
          if(courP.candidat.length != 0){
            for(let index = 0; index< courP.candidat.length; index++){
              this.follow_cours_pratique += courP.candidat[index] + ',';
              console.log(this.follow_cours_pratique);
            }
          }
          this.form.patchValue({
            date: courP.date,
            date_debut: courP.date_debut,
            date_fin: courP.date_fin,
            permis: courP.permis,
            type: courP.type,
            candidat: courP.candidat[0],
            moniteur_pratique_id: courP.moniteur_pratique_id,
            vehicule_id: courP.vehicule_id,
          });
       
          this.candidatService.getListCandidat(courP.candidat).subscribe(data=>{
            console.log("candidat list");
            console.log(data) 
            this.listCandidat = data
            courP.candidat.map((val, index) =>{
              console.log("list candidatsgfg");
              console.log(courP.candidat);
              console.log(this.listCandidat);
              this.list_candidat = this.listCandidat;
              console.log(this.listCandidat.split(','));
              let a = `${val}`;
              this.listCandidatV.push({  val: this.listCandidat.split(',')[index]});
              this.listCandidatK.push({key: val});
              console.log(this.listCandidatK);
              console.log({val: this.listCandidat.split(',')[index]});
              console.log("object of candidat");
              console.log(this.listCandidatV);
            })
             })
             
          })
          //
          let id_pr = Number(this.route.snapshot.paramMap.get('id'));
          let id_ecole = localStorage.getItem('autoEcole_id');
          this.dataService.getPresencecourPByIdCour(id_ecole, id_pr).subscribe(data=>{
            console.log("presencegfffffffff");
            console.log(JSON.parse(data));
            this.presence = JSON.parse(data).presence;
            console.log("list presence pratique");
            console.log(this.presence);
          })
          //
     }else{
      this.addOrUpdate = "Ajouter";
      // these two function take the id of the auto ecole as argument
      this.is_update = false;
    }
    let auto_ecole =  localStorage.getItem('autoEcole_id');
    this.dataService.getMoniteurP(auto_ecole).subscribe(data =>{
     this.monitorP_E = data
     console.log("moniteur pratique");
     console.log(data);
     });
     // get vehicule
     this.dataService.getVehicules(auto_ecole).subscribe( data =>{
      console.log('data vehicule');
      this.vehicule_ecole = JSON.parse(data);
      console.log(JSON.parse(data))
    }, error => this.handleError(error));
    // get candidat
    this.candidatService.getCandidat(auto_ecole).subscribe(data=>{
      console.log("candidat cours pratique");
      this.candidatData = data.filter(candidat => candidat.actif === 1);
      console.log(this.candidatData);
      }, 
        error => this.handlerror(error)    
      );

  }

  handleError(error:any){
    console.log('there is an error')
    
    console.log(error)
    
  }
  addCours_pratique(){
    this.submitted = true;
    if(this.form.invalid){
      console.log("form invalid ");
      return;
    }
    console.log("add cours pratique");
    console.log(this.form.value);
    if(this.is_update){
      // id cours
      this.id_auto_ecoleOrCour = Number(this.route.snapshot.paramMap.get('id'));
    }else{
      // id auto ecole
       this.id_auto_ecoleOrCour = localStorage.getItem('autoEcole_id');
    }
    let auto_id = localStorage.getItem('autoEcole_id');
    this.dataService.addCourPratique(auto_id, this.is_update, this.id_auto_ecoleOrCour,
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
        console.log("create cours pratique ");
        console.log(data);
        this.router.navigateByUrl('/listes-conduites');
      },
        error => this.handlerror(error)
      )

  }
  handlerror(error:any){
    console.log("we have error about cour pratique");
      console.log(error);
  }
  
  add_to_list(e:any){
      // add candidat to list presence
      console.log(this.follow_cours_pratique);
      if(!this.follow_cours_pratique.includes(e.target.value)){
        this.presence[e.target.value] = 'A';
        console.log(this.presence);
        // get candidat that selected
        this.candidatService.getCandidatById(e.target.value).subscribe((data:any) =>{
           console.log("candidat: ", e.target.value);          
           console.log(data);
           // data.nom_fr + " " + prenom_fr
           this.candidat_list +=  data.nom_fr + " " + data.prenom_fr + ", ";
           this.listCandidat +=  data.nom_fr + " " + data.prenom_fr + ", ";
           console.log("list of candidat selected");
           console.log(this.candidat_list);
           });
           //  add id of the candidat to list id candidats inscrit in this cours
           this.follow_cours_pratique += e.target.value + ',';

         }
         console.log("presence");
         console.log(this.presence);
         console.log("list id candidat");
         console.log(this.follow_cours_pratique);

   }
}