import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { PaimentCandidatState } from 'src/app/state/peimentCandidat/peimentCandidat.state';
import { ThisReceiver } from '@angular/compiler';
import { addPaiment, updatePaiment } from 'src/app/state/peimentCandidat/paimentCandidat.actions';


@Component({
  selector: 'app-paiment-candidat-form',
  templateUrl: './paiment-candidat-form.component.html',
  styleUrls: ['./paiment-candidat-form.component.css']
})
export class PaimentCandidatFormComponent implements OnInit {
  submitted:any = false;
  data:any;
  hidden:any = false;
  dateVal = new Date();   
  base64Img_image:any;
  form:any;
  // id auto ecole or id candidat-paiment
  id:any;
  id_c:any;
  id_candidat:any;
  is_update:boolean = false;
  candidat_route_id:any;
  paimentDataCandidat:any;
  updateOrAdd:any;
  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute,
              private store:Store<{paimentCandidat: PaimentCandidatState}>
    ) { }

  ngOnInit(): void {
    // create form controller
    this.createForm();
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.id_c = this.id; 
    console.log(this.id);
    if(this.router.url === '/form-paiement/' + this.id){
      this.updateOrAdd = 'Ajouter';
      this.id = 1;
      this.is_update = false;
    }else{ // /paiement/8 update paiement
      this.updateOrAdd = 'Modifier';
      this.is_update = true;
      this.dataService.getPaimentCandidatById(this.id).subscribe(data=>{
        console.log("data paiment candidat********************************************************");
        console.log(JSON.parse(data));
        this.id_candidat = JSON.parse(data).candidat_id;
        this.paimentDataCandidat = JSON.parse(data);
        this.candidat_route_id = this.paimentDataCandidat.candidat_id;
        this.form.patchValue({
          date: this.paimentDataCandidat.date,
          montant: this.paimentDataCandidat.montant,
          banque: this.paimentDataCandidat.nom_banque,
          type: this.paimentDataCandidat.type_p,
          numero: this.paimentDataCandidat.numero,
          remarque: this.paimentDataCandidat.remarque,
        });
  
      })
    }
  }
  createForm(){
    this.form = new FormGroup({
      date: new FormControl('', Validators.required),
      montant: new FormControl('', Validators.required),
      banque: new FormControl(''),
      type: new FormControl(''),
      numero: new FormControl(''),
      image: new FormControl(''),
      remarque: new FormControl(''),
    })
  }
  AddOrUpdatepaiment(){
    this.submitted = true;
    if(this.form.invalid){
      console.log("form invalid ");
      return;
    }
    let idC = Number(this.route.snapshot.paramMap.get('id'));
    let data = {
      date: this.form.value.date,
      montant: this.form.value.montant,
      banque: this.form.value.banque,
      type: this.form.value.type,
      numero: this.form.value.numero,
      remarque: this.form.value.remarque,
      image: this.base64Img_image,
    };
    if(this.is_update){ 
        // dispatch action    updatePaiment
        let idpaiement = Number(this.route.snapshot.paramMap.get('id'));
        this.store.dispatch(updatePaiment({idPaiment:idpaiement, data}));
     }else{
        // dispatch  action addPaiment
        this.store.dispatch(addPaiment({idAutoEcole:localStorage.getItem('autoEcole_id'), idCandidat: idC, data}));
       }
 

  }
  handleError(error:any){
    console.log("there is an error ");
    console.log(error);
  }
  setHidden(e:any){
    if(e.target.value != 'espece'){
      this.hidden = true;
    }else{
      this.hidden = false;
    }
  }
  fileChangeEvent(e: any) {

    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                       this.base64Img_image = e.target.result;
            };
        };

        reader.readAsDataURL(e.target.files[0]);
    }
}
}