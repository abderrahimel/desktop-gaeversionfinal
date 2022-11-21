import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {  Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { loadcoursSupplementaire } from 'src/app/state/coursSupplementaire/coursSupplementaire.actions';
import { CoursRecetteState } from 'src/app/state/coursSupplementaire/coursSupplementaire.state';
import { DepenseCategorieState } from 'src/app/state/depenseCategorie/depenseCategorie.state';
import { loadDepenselocal, loadDepensepersonnel, loadDepensevehicule } from 'src/app/state/depenses/depense.actions';
import { DepenseState } from 'src/app/state/depenses/depense.state';
import { ExamenState } from 'src/app/state/examen/examen.state';
import { loadproduitCandidat } from 'src/app/state/produitCandidat/produitCandidat.actions';
import { ProduitCandidatState } from 'src/app/state/produitCandidat/produitCandidat.state';
import { UserState } from 'src/app/state/user/user.state';
import * as Highcharts from "highcharts/highstock";
import * as _ from 'lodash';
import { $$iterator } from 'rxjs/internal/symbol/iterator';

export interface PeriodicElement {
  depense: number;
  month: string;
  recette: number;
  solde: number;
  url: any;
  recetteUrl:any;
}
export interface EmpFilter {
  name:any,
  options:string[];
  defaultValue:string;
}

const totaldepense = [];
const ELEMENT_DATA: PeriodicElement[] = [
  {month: 'Janvier	', depense: 0, recette: 1, solde: 0, url: '/depense-info/1', recetteUrl: '/recette-info/1'},
  {month: 'Février', depense:  0, recette: 4, solde: 0, url: '/depense-info/2', recetteUrl: '/recette-info/2'},
  {month: 'Mars', depense: 0, recette: 6, solde: 0, url: '/depense-info/3', recetteUrl: '/recette-info/3'},
  {month: 'Avril', depense: 0, recette: 9, solde: 0, url: '/depense-info/4', recetteUrl: '/recette-info/4'},
  {month: 'Mai', depense: 0, recette: 10, solde: 0, url: '/depense-info/5', recetteUrl: '/recette-info/5'},
  {month: 'Juin', depense: 0, recette: 12, solde: 0, url: '/depense-info/6', recetteUrl: '/recette-info/6'},
  {month: 'Juillet', depense: 0, recette: 14, solde: 0, url: '/depense-info/7', recetteUrl: '/recette-info/7'},
  {month: 'Aout', depense: 0, recette: 15, solde: 0, url: '/depense-info/8', recetteUrl: '/recette-info/8'},
  {month: 'Septembre', depense: 0, recette: 18, solde: 0, url: '/depense-info/9', recetteUrl: '/recette-info/9'},
  {month: 'Octobre', depense: 0, recette: 20, solde: 0, url: '/depense-info/10', recetteUrl: '/recette-info/10'},
  {month: 'Novembre', depense: 0, recette: 20, solde: 0, url: '/depense-info/11', recetteUrl: '/recette-info/11'},
  {month: 'Décembre', depense: 0, recette: 20, solde: 0, url: '/depense-info/12', recetteUrl: '/recette-info/12'},
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions:Highcharts.Options = {};
  displayedColumns: string[] = ['cin', 'candidat', 'date_examen','etat'];
  @ViewChild('empTbSort') empTbSort = new MatSort();
  @ViewChild('paginatorFirst') paginatorFirst!: MatPaginator;    
  displayedColumns1: string[] = ['candidat', 'absence'];    
  @ViewChild('empTbSort1') empTbSort1 = new MatSort();
  @ViewChild('paginatorSecond') paginatorSecond!: MatPaginator;    
  displayedColumns2: string[] = ['vehicule', 'date', 'type', 'etat'];   
  @ViewChild('empTbSort2') empTbSort2 = new MatSort();
  @ViewChild('paginator2') paginator2!: MatPaginator;     
  displayedColumns3: string[] = ['cin', 'nom', 'date_inscription', 'numero_contrat'];    
  @ViewChild('empTbSort3') empTbSort3 = new MatSort();
  @ViewChild('paginator3') paginator3!: MatPaginator;  
  displayedColumns4: string[] = ['mois', 'montant'];    
  displayedColumns5: string[] = ['nom', 'cin', 'categorie', 'date_examen', 'date_depot'];   
  @ViewChild('empTbSort5') empTbSort5 = new MatSort();
  @ViewChild('paginator5') paginator5!: MatPaginator;      
  displayedColumns6: string[] = ['nom', 'cin', 'categorie', 'date_examen', 'date_depot'];    
  @ViewChild('empTbSort6') empTbSort6 = new MatSort();
  @ViewChild('paginator6') paginator6!: MatPaginator;     
  dataSource = new MatTableDataSource();
  dataSource1 = new MatTableDataSource();
  dataSource2 = new MatTableDataSource();
  dataSource3 = new MatTableDataSource();
  dataSource4!: MatTableDataSource<any>;
  dataSource5 =  new MatTableDataSource();
  apiResponseReussi= [];
  apiResponseNoReussi= [];
  dataSource6 = new MatTableDataSource();
  lengthExamen:any;  
  lengthAbsence:any;  
  lengthVehicules:any;  
  lengthReussiCandidat:any;
  lengthNoReussiCandidat:any;
  depenseArray:any = [0,0,0,0,0,0,0,0,0,0,0,0];
  recetteArray:any = [0,0,0,0,0,0,0,0,0,0,0,0];
  soldeArray:any = [0,0,0,0,0,0,0,0,0,0,0,0];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  active = 0;
  page = 1;
  pageSize = 4;
  collectionSize = 20;
  // filter info coulumn

   public etat_auto_ecole = 'en_attente';
   dateVal = new Date();
   logo:any;
   loadData1:any;
   autoecole:any;
   recettes:any;
   produitSuppData:any;
   permis:any;
   candidatReussi:any;
   datasupplementaire:any;
   candidatNoReussi:any;
   absences:any;
   depenseLocal:any;
  depenseVehicule:any;  
  data1personnel:any;
   candidatAbsences:any;
   examenCandidats:any;
   candidatsInscrit:any;
   vehicules:any;
   total:any = 0;
   statistiqueInscription:any;
   public yearsPaiement = ['2017', '2018', '2019']
   
   statistique = ELEMENT_DATA;
   tabs = [  // Boutique j2hb ,   Actualités , Recrutement Des Moniteurs  ,  Vehicule D'occasion , Auto-Ecoles Adherents, Ecoles Vendre
   {
    tabName: 'Dashboard',
    id: 1
   },
   {
      tabName: 'Boutique j2hb',
      id: 2
    },
    {
      tabName: 'Actualités',
      id: 3
    },
    {
      tabName: 'Recrutement Des Moniteurs',
      id: 4
    },
    {
      tabName: 'Vehicule D\'occasion',
      id: 5
    },
    {
      tabName: 'Auto-Ecoles Adherents',
      id: 6
    },
    {
      tabName: 'Ecoles Vendre',
      id: 7
    }
    ];
    currentTabIndex = 0;
    currentTab = {tabName: 'Dashboard',id: 1};

       constructor(
                   private store: Store<{user:UserState, examen: ExamenState, categorieDepense: DepenseCategorieState, depense: DepenseState, produitCandidat: ProduitCandidatState, coursRecette: CoursRecetteState}>, 
                   private dataService:DataService,
                  
        ) {
         
      }

    
  ngOnInit(): void {
    //  depense array calculated when we call getDepense()
     this.getDepense();
     this.getdata();
    //   recette array and sold array  calculated after calling getrecette()
     this.getrecette();
     this.initStatistique();
     this.getExamenCandidat()
     // absence candidat
    //  this.getAbsence()
    this.getVehicules();
    this.getCandidatInscription()
  }
  getExamenCandidat(){
    this.dataService.getExamen(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.examenCandidats = data
      this.dataSource  = new MatTableDataSource(this.examenCandidats);
      this.dataSource.sort = this.empTbSort;
      this.dataSource.paginator = this.paginatorFirst;
      // this.lengthExamen = this.examenCandidats.reduce((acc, o) => acc + Object.keys(o).length, 0)
    })
  }
  applyFilter(event:any){
    let value = event.target.value
    this.dataSource5.filter = value.trim().toLowerCase()
  }
  applyFilter1(event:any){
    let value = event.target.value
    this.dataSource1.filter = value.trim().toLowerCase()
  }
  applyFilter2(event:any){
    let value = event.target.value
    this.dataSource2.filter = value.trim().toLowerCase()
  }
  applyFilter3(event:any){
    let value = event.target.value
    this.dataSource3.filter = value.trim().toLowerCase()
  }
  applyFilter4(event:any){
    let value = event.target.value
    this.dataSource4.filter = value.trim().toLowerCase()
  }
  applyFilter5(event:any){
    let value = event.target.value
    this.dataSource5.filter = value.trim().toLowerCase()
  }
  ngAfterView(){
      this.dataSource5.sort = this.empTbSort5;
      this.dataSource5.paginator = this.paginator5;
      this.dataSource6.sort = this.empTbSort6;
      this.dataSource6.paginator = this.paginator6;
      this.dataSource3.sort = this.empTbSort3;
      this.dataSource3.paginator = this.paginator3;
  }
  applyFilter6(event:any){
    let value = event.target.value
    this.dataSource6.filter = value.trim().toLowerCase()
  }
  getdata(){
    //   
   this.dataService.getExamenReussi(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.candidatReussi = JSON.parse(data);
      this.dataSource5 = new MatTableDataSource(this.candidatReussi)
      this.dataSource5.sort = this.empTbSort5;
      this.dataSource5.paginator = this.paginator5;
      this.apiResponseReussi = this.candidatReussi;
   })
   // examen NO reussi
   this.dataService.getExamenNoReussi(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.candidatNoReussi = JSON.parse(data);
      this.dataSource6 = new MatTableDataSource(this.candidatNoReussi)
      this.dataSource6.sort = this.empTbSort6;
      this.dataSource6.paginator = this.paginator6;
      this.apiResponseNoReussi = this.candidatNoReussi;
 })
  }
  getAbsence(){
    this.dataService.getAbsence(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.candidatAbsences = JSON.parse(data);
      this.dataSource1  = new MatTableDataSource(this.candidatAbsences);
      this.dataSource1.sort = this.empTbSort1;
      this.dataSource1.paginator = this.paginatorSecond;
   })
  }
  getVehicules(){
    this.dataService.getVehicules(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.vehicules = JSON.parse(data);
      this.dataSource2  = new MatTableDataSource(this.vehicules);
      this.dataSource2.sort = this.empTbSort2;
      this.dataSource2.paginator = this.paginator2;
   })
  }
  getCandidatInscription(){
    this.dataService.getCandidats(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.candidatsInscrit = JSON.parse(data);
      this.dataSource3  = new MatTableDataSource(this.candidatsInscrit);
      this.dataSource3.sort = this.empTbSort3;
      this.dataSource3.paginator = this.paginator3;
   })

  }
  initStatistique(){
    this.chartOptions  = {
      chart: {
        type: "column",
        scrollablePlotArea: {
          minWidth: 1000
        }
      },
      title: {
        text: "Statistic"
      },
      subtitle:{
        text: 'Tous les statistiques des Dépense, Recette et Sold'
      },
      tooltip: {
        shared: true
      },
      xAxis: {
        scrollbar: {
          enabled: false
        },
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        title:{
          text: 'Les Months'
        }
      },
      yAxis:{
        title:{
          text: 'Présentation Des Montants'
        }
      },
      
      series: [
        {
          type: "column",
          name: "Depense",
          data: [0,0,0,0,6500,0,0,0,0,0,0,0]
        },
        {
          type: "column",
          name: "Recette",
          data: [0,0,0,0,0,0,495,860,0,0,0,0]
        },
        {
          type: "column",
          name: "Sold",
          data: [0,0,0,0,-6500,0,495,860,0,0,0,0]
        }
      ]
    };
  }
  getDepense(){ 
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.depense.depense.local.loaded){
        this.store.dispatch(loadDepenselocal({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
      if(!store.depense.depense.personnel.loaded){
        this.store.dispatch(loadDepensepersonnel({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
      if(!store.depense.depense.vehicule.loaded){
        this.store.dispatch(loadDepensevehicule({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
    })
    ELEMENT_DATA.map(data=>{
      let month = Number(data.url.split('/')[2]);
      let totalDepense = 0;
         // select depense local
        this.store.select(state=>state.depense.depense.local.local).subscribe(dlocal=>{
          this.depenseLocal = dlocal; 
          let totalLocal = 0;
          if(this.depenseLocal){
            this.depenseLocal = this.depenseLocal.filter((local:any)=>  Number(local?.date?.split('-')[1]) === month);
            this.depenseLocal.map((local:any)=>{
              totalLocal += local.montant;
            })
          }
          totalDepense += totalLocal
        }) 
        //  select depense vehicule 
        this.store.select(state=>state.depense.depense.vehicule.vehicule).subscribe(dvehicule=>{
          this.depenseVehicule = dvehicule;
          let totalvehicule  = 0;
          if(this.depenseVehicule){
            this.depenseVehicule = this.depenseVehicule.filter((vehicule:any)=>  Number(vehicule?.date?.split('-')[1]) === month);
            this.depenseVehicule.map((vehicule:any)=>{
              totalvehicule += vehicule.montant;
            })
          }
          totalDepense += totalvehicule
        })
        // select depense personnel
        this.store.select(state=>state.depense.depense.personnel.personnel).subscribe(dpersonnel=>{
          this.data1personnel = dpersonnel;
          let totalPersonnel = 0;
          if(this.data1personnel){
            this.data1personnel = this.data1personnel.filter((personnel:any)=>  Number(personnel?.date?.split('-')[1]) === month);
            this.data1personnel.map((personnel:any)=>{
              totalPersonnel += personnel.montant;
            })
          }
          totalDepense += totalPersonnel;
          ELEMENT_DATA[month-1].depense = totalDepense;
         
        });
        
    })
     
}
getrecette(){
   // dispatch action loadproduitCandidat
   this.store.pipe(take(1)).subscribe(store=>{
    if(!store.produitCandidat.produitCandidat.loaded){
      this.store.dispatch(loadproduitCandidat({idAutoEcole: localStorage.getItem('autoEcole_id')}));
    }
    if(!store.coursRecette.coursRecette.loaded){
      this.store.dispatch(loadcoursSupplementaire({idAutoEcole: localStorage.getItem('autoEcole_id')}));
    }
  });
  ELEMENT_DATA.map(recette=>{
    let month = Number(recette.url.split('/')[2]);
    let total = 0;
      this.store.select(state=>state.produitCandidat.produitCandidat.produitCandidat).subscribe(produitCandidat=>{
        this.produitSuppData = produitCandidat;
        if(this.produitSuppData){
          this.produitSuppData = this.produitSuppData.filter((data:any)=>Number(data?.date?.split('-')[1]) === month);
          let c1 = 0;
        this.produitSuppData.map((data:any)=>{
          c1 += Number(data.prixTotale) ;
        });
        total += c1;
        }
        
      });
      this.store.select(state=>state.coursRecette.coursRecette).subscribe(coursRecette=>{
        this.datasupplementaire = coursRecette.coursSupplementaire;
        if(this.datasupplementaire){
          this.datasupplementaire = this.datasupplementaire.filter((data:any)=>Number(data?.date?.split('-')[1]) === month);
          let c2 = 0;
        this.datasupplementaire.map((data:any)=>{
          c2 += Number(data.montant);
        });
        total += c2;
        }
        this.permis = coursRecette.permis;
        if(this.permis){
          this.permis = this.permis.filter((data:any)=>Number(data?.date?.split('-')[1]) === month);
          let c3 = 0;
        this.permis.map((data:any)=>{
          c3 += Number(data.montant);
        });
        total += c3;
        }
        ELEMENT_DATA[month-1].recette = total;
        // get solde for each month
        this.getSold();
        // total solde
        this.getTotalSolde()

      });
  })
}
getSold(){
  ELEMENT_DATA.map((data:any)=>{
    let month = Number(data.url.split('/')[2]);
    ELEMENT_DATA[month-1].solde = ELEMENT_DATA[month-1].recette - ELEMENT_DATA[month-1].depense;
  })
}
getTotalSolde(){
  ELEMENT_DATA.map((data:any)=>{
    let month = Number(data.url.split('/')[2]);
      this.total += Number(ELEMENT_DATA[month-1].solde);
  })
}
onChange(e:any){
  if(e.target.value === ''){
    this.dataSource5 = new MatTableDataSource(this.candidatReussi);
    this.dataSource6 = new MatTableDataSource(this.candidatNoReussi);
  }else{
      let filterData = _.filter(this.apiResponseReussi, (item)=>{
        return item.categorie.toLowerCase() == e.target.value.toLowerCase()
      })
      let filterData1 = _.filter(this.apiResponseNoReussi, (item)=>{
        return item.categorie.toLowerCase() == e.target.value.toLowerCase()
      })
      this.dataSource5 = new MatTableDataSource(filterData);
      this.dataSource6 = new MatTableDataSource(filterData1);
  }
    this.dataSource5.sort = this.empTbSort5;
    this.dataSource5.paginator = this.paginator5;
    this.dataSource6.sort = this.empTbSort6;
    this.dataSource6.paginator = this.paginator6;
}
onChange3(e:any){
  if(e.target.value === ''){
    this.dataSource3 = new MatTableDataSource(this.candidatsInscrit);
    return;
  }
    let filterData = _.filter(this.candidatsInscrit, (item)=>{
      return item.categorie.toLowerCase() == e.target.value.toLowerCase()
    })
    this.dataSource3 = new MatTableDataSource(filterData);
    this.dataSource3.sort = this.empTbSort3;
    this.dataSource3.paginator = this.paginator3;
}
onchangeInput(e:any){
  if(e.target.value === ''){
    this.dataSource5 = new MatTableDataSource(this.candidatReussi);
    this.dataSource6 = new MatTableDataSource(this.candidatNoReussi);
  }else{
      let filterData = _.filter(this.apiResponseReussi, (item)=>{
        return item.date_examen.toLowerCase() == e.target.value.toLowerCase()
      })
      let filterData1 = _.filter(this.apiResponseNoReussi, (item)=>{
        return item.date_examen.toLowerCase() == e.target.value.toLowerCase()
      })
      this.dataSource5 = new MatTableDataSource(filterData);
      this.dataSource6 = new MatTableDataSource(filterData1);
  }

  this.dataSource5.sort = this.empTbSort5;
  this.dataSource5.paginator = this.paginator5;
  this.dataSource6.sort = this.empTbSort6;
  this.dataSource6.paginator = this.paginator6;

}
onchangeInput3(e:any){
  if(e.target.value === ''){
    this.dataSource3 = new MatTableDataSource(this.candidatsInscrit);
    return;
  }
  let filterData = _.filter(this.candidatsInscrit, (item)=>{
    return item.date_inscription.toLowerCase() == e.target.value.toLowerCase()
  })

  this.dataSource3 = new MatTableDataSource(filterData);
  this.dataSource3.sort = this.empTbSort3;
  this.dataSource3.paginator = this.paginator3;
}
  selectionChange(event) {
    this.currentTabIndex = event.index;
    this.currentTab = this.tabs[event.index];
  }
}
