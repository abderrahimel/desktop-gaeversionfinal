import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { DataService } from 'src/app/services/data.service';
import { loadExamenAction } from 'src/app/state/examen/examen.actions';
import { ExamenState } from 'src/app/state/examen/examen.state';
import { loadExamenNoReussiAction } from 'src/app/state/examenNoreussi/examenNoreussi.actions';
import { ExamenNoreussiState } from 'src/app/state/examenNoreussi/examenNoreussi.state';
import { loadExamenReussiAction } from 'src/app/state/examenreussi/examenreussi.actions';
import { ExamenreussiState } from 'src/app/state/examenreussi/examenreussi.state';

@Component({
  selector: 'app-noteexamen-modal',
  templateUrl: './noteexamen-modal.component.html',
  styleUrls: ['./noteexamen-modal.component.css']
})

export class NoteexamenModalComponent implements OnInit {
  @Input() btn: any;
  @Input() data: any;   
  @Input() idexamen: any;
  @Input() categoriee: any;
  submitted:boolean = false;
  examen:any;
  give_note:boolean = false;
  data_examen:any;
  date_examen:any;
  bool1:any = false;
  bool2:any = false;
  bool3:any = false;
  categorieId:any;
  ratrapage: boolean = false;
  result:any;
  moyenCategorie:any;
  categorie:any;
  idExamen:any;
  ex:any;
  mnths:any = { Jan: "01",  Feb: "02",  Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"};
  categorie_moyen:any = {};
  dataExamen:any;
  examenPratique: boolean = false;
  ratrapageExamenPratique: boolean = false;
  showformExam:boolean = false
  showformconfigureNote:boolean = false;
  notes:any;
  etat1:any;
  show:boolean = false;
  etat2:any;
  currentDate:any = new Date().getTime();
  showmessageAttendateExamen:boolean = false;
  form = new FormGroup({
    examenTheorique: new FormControl(''),
    note1: new FormControl('', Validators.required),
    note2: new FormControl(''),
    date_note1: new FormControl(''),
    date_note2: new FormControl(''),
    date_etat1: new FormControl(''),
    date_etat2: new FormControl(''),
    examenPratique: new FormControl(''),
    etat_1: new FormControl(''),
    etat_2: new FormControl(''),
    resultat: new FormControl(''),
  })

  constructor( public activeModal: NgbActiveModal,
               private dataservice: DataService, 
               private store:Store<{examen: ExamenState, examenreussi: ExamenreussiState, examenNoreussi: ExamenNoreussiState}>
    ) { }

    ngOnInit(): void {
      console.log(this.data);
      this.getData();
      this.showForm(this.data?.id, this.data?.date_examen, this.categoriee)
    }
    
  getData(){
      let ecole_id = localStorage.getItem('autoEcole_id');
      this.dataservice.getNotes(ecole_id).subscribe(data=>{
        this.notes = JSON.parse(data);
        this.notes.map(data=>{
            this.categorie_moyen[data?.categorie] = data?.moyen;
        })
      })
  }
    valider(){
      this.submitted = true;
      if(this.form.invalid){
          return;
      }
     this.dataservice.addNoteCandidat(this.idExamen,{
      etat_1: this.form.value.etat_1,
      date_etat1: this.form.value.date_etat1,
      etat_2: this.form.value.etat_2,
      date_etat2: this.form.value.date_etat2,
      note1: this.form.value.note1,
      date_note1: this.form.value.date_note1,
      note2: this.form.value.note2,
      date_note2: this.form.value.date_note2,
      moyen: this.categorieId.moyen
     }).subscribe(
      data=>{
        this.store.dispatch(loadExamenAction({idAutoEcole:localStorage.getItem('autoEcole_id')}))
        this.store.dispatch(loadExamenReussiAction({idAutoEcole: localStorage.getItem('autoEcole_id')}));
        this.store.dispatch(loadExamenNoReussiAction({idAutoEcole: localStorage.getItem('autoEcole_id')}));
        this.showformExam = false;
     },
     error =>console.log(error.error)
     )
     this.activeModal.dismiss('Cross click');
    }
  showForm(idExamen:any, dateExamen:any, categorie:any){

    this.date_examen = dateExamen;
    let DateE = new Date(dateExamen).getTime();

    this.dataservice.getNotes(localStorage.getItem('autoEcole_id')).subscribe(data =>{
    this.categorieId = JSON.parse(data).filter(note => note.categorie === categorie)[0];
   
   if(this.categorieId?.categorie === categorie){
    this.showformconfigureNote = false;
    // if dateExamen<= current date then show form note to add note candida 
    if(DateE <= this.currentDate){
        this.showformExam = true
        this.showmessageAttendateExamen = false;
    }
    // else show message you need to wait until come the day of the examen
    else{
       this.showformExam = false;
       this.showmessageAttendateExamen = true;
    }
   }else{
    // else show message to tell them we need to configure note categorie
    this.showformconfigureNote = true;
    this.showformExam =false;
    this.showmessageAttendateExamen = false;
   }
  })
  this.idExamen = idExamen;

    this.ex = this.data;
    // let dateExam = [dateExamen.split('-')[1], dateExamen.split('-')[2], dateExamen.split('-')[0]].join('/');
    // var someDate = new Date([dateExam.split('/')[0], dateExam.split('/')[1], dateExam.split('/')[2]].join('/'));
    // var numberOfDaysToAdd = 15;
    // var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    // let string = new Date(result).toDateString().split(" ");
    this.form.patchValue({
     note1: this.data['note1'] === '-1'? null:this.data['note1'],
     note2: this.data['note2'] === '-1'? null:this.data['note2'],
     etat_1: this.data['etat_1'],
     etat_2: this.data['etat_2'],
     date_etat1: this.data['date_etat1'],
     date_etat2: this.data['date_etat2'],
     date_note1: dateExamen,
    //  date_note2: [string[3], this.mnths[string[1]], string[2]].join("-"),
     examenPratique: 'examenPratique1',
     examenTheorique: 'examenTheorique',
   });

    if(this.form.value.note2 === '-1' || this.form.value.note2 === null){
     this.ratrapage = false;
    }else{
     this.ratrapage = true;
    }
    if(this.form.value.etat_1 ==='en_attente'){
     this.examenPratique = false;
    }else{
     this.examenPratique = true;
    }
    if(this.form.value.etat_2 === 'en_attente'){
     this.ratrapageExamenPratique = false;
    }else{
     this.ratrapageExamenPratique = true;
    }

}



  hiddenDiv(){
    this.showformconfigureNote = false;
    this.showmessageAttendateExamen = false;
  }

  hiddenform(){
    this.ratrapage = false;
    this.examenPratique = false;
    this.ratrapageExamenPratique = false;
    this.showformExam = false;
    
    this.form.patchValue({
      examenTheorique: '',
      note1: null,
      note2: null,
      date_note1: null,
      date_note2: null,
      date_etat1: null,
      date_etat2: null,
      examenPratique: '',
      etat_1: null,
      etat_2: null,
      resultat: null,
    })
  }
  
  change(){
    // // examen theorique
    if(this.form.value.note1){  
      if(this.form.value.note1 >= this.categorieId?.moyen){
        this.examenPratique = true;
        this.ratrapageExamenPratique = false;
        this.ratrapage = false;
      }else{
        // this.ratrapage = true;
        this.examenPratique = false;
        this.ratrapageExamenPratique = false;
        this.ratrapage = true;
      }
    }else{
      this.ratrapage = false;
      this.examenPratique = false;
      this.ratrapageExamenPratique = false;
    }
  }

  changenote2(){
    // examen pratique
    if(this.form.value.note2){
      if(this.form.value.note2 >= this.categorieId?.moyen){
        this.examenPratique = true;
        this.ratrapageExamenPratique = false;
      
      }else{
        this.examenPratique = false;
      }
    }
    
  }

  changeEtat1(){
    if(this.form.value?.etat_1 === 'noValide'){
        this.ratrapageExamenPratique = true;
    }else{
      this.ratrapageExamenPratique = false;
    }
  }

  dateExamenP(date:any){
    let date_etat1 = this.form.value.date_etat1;
    let dateExam = [date_etat1.split('-')[1], this.form.value.date_etat1.split('-')[2], this.form.value.date_etat1.split('-')[0]].join('/');
    let mnths = { Jan: "01",  Feb: "02",  Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"};
    var someDate = new Date([dateExam.split('/')[0], dateExam.split('/')[1], dateExam.split('/')[2]].join('/'));
    var numberOfDaysToAdd = 15;
    var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    let string = new Date(result).toDateString().split(" ");
    this.form.patchValue({
      date_etat2:  [string[3], mnths[string[1]], string[2]].join("-"),
    });

  }
}
