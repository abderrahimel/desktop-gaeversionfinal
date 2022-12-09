import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit {
  id:any;
  produit:any;
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
   
   currentTabIndex = 4;
   currentTab = {tabName: 'Vehicule D\'occasion',id: 5};
   constructor(private route: ActivatedRoute,
    private auth: AuthService,
    private _route: Router,
     private dataService:DataService) { }
   ngOnInit(): void {
    this.currentTab.tabName = 'Vehicule D\'occasion';
     this.id = Number(this.route.snapshot.paramMap.get('id'));
     this.getProduitAdminById();
   }

   getProduitAdminById(){
     this.dataService.getProduitAdminById(this.id).subscribe(data=>{
       this.produit = data;

       this.produit.created_at = this.produit?.created_at.split('T')[0]
     })
   }
   selectionChange(event) {
    this.currentTabIndex = event.index;
    this.currentTab = this.tabs[event.index];
  }
 }
 