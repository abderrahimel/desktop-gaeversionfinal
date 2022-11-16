import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import * as _ from 'lodash';
import { NoteexamenModalComponent } from 'src/app/modal/noteexamen-modal/noteexamen-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailExamenComponent } from 'src/app/modal/detail-examen/detail-examen.component';

@Component({
  selector: 'app-results-candidats',
  templateUrl: './results-candidats.component.html',
  styleUrls: ['./results-candidats.component.css']
})
export class ResultsCandidatsComponent implements OnInit {
  displayedColumns: string[] = ['cin', 'nom', 'categorie','moniteur', 'date_examen', 'actions'];
  @ViewChild('empTbSort') empTbSort = new MatSort();
  @ViewChild('paginatorFirst') paginatorFirst!: MatPaginator; 
  dataSource = new MatTableDataSource();  
  displayedColumns1: string[] = ['cin', 'nom', 'categorie','moniteur', 'date_examen', 'actions']; 
  @ViewChild('empTbSort1') empTbSort1 = new MatSort();
  @ViewChild('paginatorSecond') paginatorSecond!: MatPaginator; 
  dataSource1 = new MatTableDataSource();   
  dateVal = new Date();
  message= '';
  candidat_data:any;
  current_candidat:any;
  candidats_table1:any = [];
  candidats_table2:any = [];
  examen:any;
  ratrapage:boolean = false; 
  examenPratique:boolean = false; 
  ratrapageExamenPratique:boolean = false;
  resultatCandidatReussi:any;
  resultatCandidatNoReussi:any;
  vva:any;
  candidat_reussi:any;
  reussi:any;
  candidat:any;
  candidats:any;
  candidat_Notreussi:any;
  moniteurP:any;
  data_candidat:any;
  showing:boolean = false;
  isReussi:Boolean = true;
  id_candidat:any;
  idAutoEcole:any; //         
  form = new FormGroup({
    examenTheorique: new FormControl(''),
    examenPratique: new FormControl(''),
    note1: new FormControl(''),
    date_note1: new FormControl(''),
    note2: new FormControl(''),
    date_note2: new FormControl(''),
    etat_1: new FormControl(''),
    date_etat1: new FormControl(''),
    etat_2: new FormControl(''),
    date_etat2: new FormControl(''),
  });

  constructor(private dataService: DataService,
              private modalService: NgbModal,
    ) { }

  ngOnInit(): void {
   this.getData()
   this.getExamenReussi()
   this.getExamenNoReussi()
  }
  ngAfterView(){
    this.dataSource.sort = this.empTbSort;
    this.dataSource.paginator = this.paginatorFirst;
    this.dataSource1.sort = this.empTbSort1;
    this.dataSource1.paginator = this.paginatorSecond;

}
  applyFilter2(event:any){
    let value = event.target.value
    this.dataSource.filter = value.trim().toLowerCase()
  }
  getExamenReussi(){
    this.dataService.getExamenReussi(this.idAutoEcole).subscribe(data=>{
      this.resultatCandidatReussi= JSON.parse(data)
      this.dataSource = new MatTableDataSource(this.resultatCandidatReussi)
      this.dataSource.sort = this.empTbSort;
      this.dataSource.paginator = this.paginatorFirst;
    });
  }
  getExamenNoReussi(){
    this.dataService.getExamenNoReussi(this.idAutoEcole).subscribe(data=>{
      this.resultatCandidatNoReussi = JSON.parse(data)
      this.dataSource1 = new MatTableDataSource(this.resultatCandidatNoReussi); 
      this.dataSource1.sort = this.empTbSort1;
      this.dataSource1.paginator = this.paginatorSecond;
    });
  }
  
  getData(){
    this.idAutoEcole = localStorage.getItem('autoEcole_id');
    this.dataService.getMoniteurP(this.idAutoEcole).subscribe(data=>{
      this.moniteurP = data;
    });
    this.dataService.getExamen(this.idAutoEcole).subscribe(data =>{
      this.examen = data;
      this.resultatCandidatReussi = this.examen.filter(exam=> exam.resultat === 1);
      this.data_candidat = this.resultatCandidatReussi;
      this.resultatCandidatNoReussi = this.examen.filter(exam=> exam.resultat === 0);
    });
    this.dataService.getCandidat(this.idAutoEcole).subscribe(data=>{
          this.candidats = JSON.parse(data); 
    })
  }
  deleteVidange(){

  }
  setStatus(data){
    
    if(data === 'reussi'){
      this.isReussi = true;
      this.data_candidat = this.resultatCandidatReussi;
    }else{
      this.isReussi = false;
      this.data_candidat = this.resultatCandidatNoReussi;
    }
  }

  detail(element:any){
    // this.showing = true;
    // this.dataService.getExamenById(id).subscribe(data=>{
    //   console.log(data);
    //   this.candidat = data; 
    //   this.form.patchValue({
    //     examenTheorique : "examenTheorique",
    //     examenPratique: "examenPratique1", 
    //     detail_id: this.candidat.id,
    //     detail_date_examen: this.candidat.date_examen,
    //     note1: this.candidat.note1,
    //     date_note1: this.candidat.date_note1,
    //     note2: this.candidat.note2,
    //     date_note2: this.candidat.date_note2,
    //     etat_1: this.candidat.etat_1,
    //     date_etat1: this.candidat.date_etat1,
    //     etat_2: this.candidat.etat_2,
    //     date_etat2: this.candidat.date_etat2,
    //   });

    // console.log(this.candidat?.note2);
    // if(this.candidat.note2 === '-1'){
    //   console.log("this.form.value.note2 === '-1'");
    //   this.ratrapage = false;
    // }else{
    //   this.ratrapage = true;
    // }
    // if(this.candidat.etat_2 === 'en_attente'){
    //   this.ratrapageExamenPratique = false;
    // }else{
    //   this.ratrapageExamenPratique = true;
    // }
    // if(this.candidat.etat_1 === 'en_attente'){
    //   this.examenPratique = false;
    // }else{
    //   this.examenPratique = true;
    // }
    // })
    const modalRef = this.modalService.open(DetailExamenComponent);
    modalRef.componentInstance.data = element;
    modalRef.componentInstance.idexamen = element?.id;
    modalRef.componentInstance.categoriee = element?.categorie;
  }

  delete(id:any){
    Swal.fire({
      title: 'confirmation',
      text: "Vous voulez vraiment confirmer la suppression !",
      icon: 'error',
      showCancelButton: true,
      cancelButtonText: 'annuler',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'oui, supprimer'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteExamen(id).subscribe(data=>{
          this.getData();
        })
      }
    })
   
  }
  hidden(){
      this.showing = false;
      this.form.patchValue({
        examenTheorique : "examenTheorique",
        examenPratique: "examenPratique1", 
        detail_id: null,
        detail_date_examen: null,
        note1: null,
        date_note1: null,
        note2: null,
        date_note2: null,
        etat_1: null,
        date_etat1: null,
        etat_2: null,
        date_etat2: null,
      });
  }
  onChange(e:any){
    if(e.target.value === ''){
      this.dataSource = new MatTableDataSource(this.resultatCandidatReussi);  
      this.dataSource = new MatTableDataSource(this.resultatCandidatNoReussi);
    }else{
      let filterData = _.filter(this.resultatCandidatReussi, (item)=>{
        return item.categorie.toLowerCase() == e.target.value.toLowerCase()
      })
      let filterData1 = _.filter(this.resultatCandidatNoReussi, (item)=>{
        return item.categorie.toLowerCase() == e.target.value.toLowerCase()
      })
      this.dataSource = new MatTableDataSource(filterData);
     

      this.dataSource1 = new MatTableDataSource(filterData1);
      
    }
    this.dataSource.sort = this.empTbSort;
    this.dataSource.paginator = this.paginatorFirst;
    this.dataSource1.sort = this.empTbSort1;
    this.dataSource1.paginator = this.paginatorSecond;
  }
  onchangeInput(e:any){
    if(e.target.value === ''){
      this.dataSource = new MatTableDataSource(this.resultatCandidatReussi);
      this.dataSource1 = new MatTableDataSource(this.resultatCandidatNoReussi);
    }else{
        let filterData = _.filter(this.resultatCandidatReussi, (item)=>{
          return item.date_examen.toLowerCase() == e.target.value.toLowerCase()
        })
        let filterData1 = _.filter(this.resultatCandidatNoReussi, (item)=>{
          return item.date_examen.toLowerCase() == e.target.value.toLowerCase()
        })
        this.dataSource = new MatTableDataSource(filterData);
        this.dataSource = new MatTableDataSource(filterData1);
    }
    this.dataSource.paginator = this.paginatorFirst;
    this.dataSource.sort = this.empTbSort;
    this.dataSource1.sort = this.empTbSort1;
    this.dataSource1.paginator = this.paginatorSecond;
  }
  onChangeMoniteur(e:any){
    if(e.target.value === ''){
      this.dataSource = new MatTableDataSource(this.resultatCandidatReussi);  
      this.dataSource = new MatTableDataSource(this.resultatCandidatNoReussi);
    }else{
      let filterData = _.filter(this.resultatCandidatReussi, (item)=>{
        return item.moniteur_pratique_id == e.target.value
      })
      let filterData1 = _.filter(this.resultatCandidatNoReussi, (item)=>{
        return item.moniteur_pratique_id == e.target.value
      })
      this.dataSource = new MatTableDataSource(filterData);
      this.dataSource1 = new MatTableDataSource(filterData1);
    }
    this.dataSource.sort = this.empTbSort;
    this.dataSource.paginator = this.paginatorFirst;
    this.dataSource1.sort = this.empTbSort1;
    this.dataSource1.paginator = this.paginatorSecond;
  }
}
