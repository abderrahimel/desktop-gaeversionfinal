import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-detailautoecolemodal',
  templateUrl: './detailautoecolemodal.component.html',
  styleUrls: ['./detailautoecolemodal.component.css']
})
export class DetailautoecolemodalComponent implements OnInit {
  @Input() data: any;
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
  constructor(public activeModal: NgbActiveModal,) { }

  ngOnInit(): void {
    this.form.patchValue({
      nom_auto_ecole: this.data?.nom_auto_ecole,
      date_ouverture: this.data?.date_ouverture,
      n_register_de_commerce: this.data?.n_register_de_commerce,
      identification_fiscale: this.data?.identification_fiscale,
      date_autorisation: this.data?.date_autorisation,
      n_agrement: this.data?.n_agrement,
      n_patente: this.data?.n_patente,
      // image_rc: this.data?.image_rc,
      // image_agrement:this.data?.image_agrement,
      n_cnss: this.data?.n_cnss,
      ice: this.data?.ice,
      n_compte_bancaire: this.data?.n_compte_bancaire,
      tva: this.data?.tva,
      pays: this.data?.pays,
      telephone: this.data?.telephone,
      ville: this.data?.ville,
      fax: this.data?.fax,
      email:  this.data?.email,
      site_web: this.data?.site_web,
      adresse: this.data?.adresse,
      cin_responsable: this.data?.cin_responsable,
      nom_responsable: this.data?.nom_responsable,
      prenom_responsable: this.data?.prenom_responsable,
      tel_responsable: this.data?.tel_responsable,
      // image_cin: this.data?.image_cin,
      adresse_responsable: this.data?.adresse_responsable,
    });
  }

}
