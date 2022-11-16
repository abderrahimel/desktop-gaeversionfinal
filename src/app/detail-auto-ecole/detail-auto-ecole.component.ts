import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-detail-auto-ecole',
  templateUrl: './detail-auto-ecole.component.html',
  styleUrls: ['./detail-auto-ecole.component.css']
})
export class DetailAutoEcoleComponent implements OnInit {

  constructor(private dataService: DataService,
              private route:ActivatedRoute,
              private router: Router,
              private auth:AuthService
    ) { }
  dateVal = new Date();
  dataLoad:any;
  img:any;
  img_cin:any;
  img_rc:any;
  image_agrement:any;
  dataAutoEcole:any;
  form = new FormGroup({
    image: new FormControl(''),
    nom_auto_ecole: new FormControl(''),
    date_ouverture: new FormControl(''),
    n_register_de_commerce: new FormControl(''),
    identification_fiscale: new FormControl(''),
    date_autorisation: new FormControl(''),
    n_agrement: new FormControl(''),
    n_patente: new FormControl(''),
    image_rc: new FormControl(''),
    image_agrement: new FormControl(''),
    n_cnss: new FormControl(''),
    ice: new FormControl(''),
    n_compte_bancaire: new FormControl(''),
    tva: new FormControl(''),
    pays: new FormControl(''),
    telephone: new FormControl(''),
    ville: new FormControl(''),
    fax: new FormControl(''),
    email:  new FormControl(''),
    password:  new FormControl(''),
    confirm_password:  new FormControl(''),
    site_web: new FormControl(''),
    adresse: new FormControl(''),
    cin_responsable: new FormControl(''),
    nom_responsable: new FormControl(''),
    prenom_responsable: new FormControl(''),
    tel_responsable: new FormControl(''),
    image_cin: new FormControl(''),
    adresse_responsable: new FormControl(''),
  });
  ngOnInit(): void {
    this.auth.authStatus.subscribe(value=>{
       if(value){
           this.getData()
      }
    })
   
    
  }

  getData(){
    let id = Number(this.route.snapshot.paramMap.get('id'));
    if(this.router.url === '/detail-auto-ecole/' + id + '/archive'){
      this.dataService.getAutoEcoleByIdDeleted(id).subscribe(data=>{
        this.dataAutoEcole = data;
        console.log(this.dataAutoEcole);
        this.img = this.dataAutoEcole.image;
        this.img_rc = this.dataAutoEcole.image_rc;
        this.image_agrement = this.dataAutoEcole.image_agrement;
        this.img_cin = this.dataAutoEcole.image_cin;
        this.form.patchValue({
          nom_auto_ecole: this.dataAutoEcole.nom_auto_ecole,
          date_ouverture: this.dataAutoEcole.date_ouverture,
          n_register_de_commerce: this.dataAutoEcole.n_register_de_commerce,
          identification_fiscale: this.dataAutoEcole.identification_fiscale,
          date_autorisation: this.dataAutoEcole.date_autorisation,
          n_agrement: this.dataAutoEcole.n_agrement,
          n_patente: this.dataAutoEcole.n_patente,
          // image_rc: this.dataAutoEcole.image_rc,
          // image_agrement: this.dataAutoEcole.image_agrement,
          n_cnss: this.dataAutoEcole.n_cnss,
          ice: this.dataAutoEcole.ice,
          n_compte_bancaire: this.dataAutoEcole.n_compte_bancaire,
          tva: this.dataAutoEcole.tva,
          pays: this.dataAutoEcole.pays,
          telephone: this.dataAutoEcole.telephone,
          ville: this.dataAutoEcole.ville,
          fax: this.dataAutoEcole.fax,
          email:  this.dataAutoEcole.email,
          site_web: this.dataAutoEcole.site_web,
          adresse: this.dataAutoEcole.adresse,
          cin_responsable: this.dataAutoEcole.cin_responsable,
          nom_responsable: this.dataAutoEcole.nom_responsable,
          prenom_responsable: this.dataAutoEcole.prenom_responsable,
          tel_responsable: this.dataAutoEcole.tel_responsable,
          // image_cin: this.dataAutoEcole.image_cin,
          adresse_responsable: this.dataAutoEcole.adresse_responsable,
        });
      })
  }else{
    this.dataService.getAutoEcoleById(id).subscribe(data =>{
      this.dataAutoEcole = data;
      console.log(this.dataAutoEcole);
      this.img = this.dataAutoEcole.image;
      this.img_rc = this.dataAutoEcole.image_rc;
      this.image_agrement = this.dataAutoEcole.image_agrement;
      this.img_cin = this.dataAutoEcole.image_cin;
      this.form.patchValue({
        nom_auto_ecole: this.dataAutoEcole.nom_auto_ecole,
        date_ouverture: this.dataAutoEcole.date_ouverture,
        n_register_de_commerce: this.dataAutoEcole.n_register_de_commerce,
        identification_fiscale: this.dataAutoEcole.identification_fiscale,
        date_autorisation: this.dataAutoEcole.date_autorisation,
        n_agrement: this.dataAutoEcole.n_agrement,
        n_patente: this.dataAutoEcole.n_patente,
        // image_rc: this.dataAutoEcole.image_rc,
        // image_agrement: this.dataAutoEcole.image_agrement,
        n_cnss: this.dataAutoEcole.n_cnss,
        ice: this.dataAutoEcole.ice,
        n_compte_bancaire: this.dataAutoEcole.n_compte_bancaire,
        tva: this.dataAutoEcole.tva,
        pays: this.dataAutoEcole.pays,
        telephone: this.dataAutoEcole.telephone,
        ville: this.dataAutoEcole.ville,
        fax: this.dataAutoEcole.fax,
        email:  this.dataAutoEcole.email,
        site_web: this.dataAutoEcole.site_web,
        adresse: this.dataAutoEcole.adresse,
        cin_responsable: this.dataAutoEcole.cin_responsable,
        nom_responsable: this.dataAutoEcole.nom_responsable,
        prenom_responsable: this.dataAutoEcole.prenom_responsable,
        tel_responsable: this.dataAutoEcole.tel_responsable,
        // image_cin: this.dataAutoEcole.image_cin,
        adresse_responsable: this.dataAutoEcole.adresse_responsable,
      });
    })
  }
  }
  back(){
      this.router.navigateByUrl('/gestion-auto-ecole');
  }

}
