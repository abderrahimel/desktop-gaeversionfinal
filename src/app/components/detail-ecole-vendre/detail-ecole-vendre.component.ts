import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-detail-ecole-vendre',
  templateUrl: './detail-ecole-vendre.component.html',
  styleUrls: ['./detail-ecole-vendre.component.css']
})
export class DetailEcoleVendreComponent implements OnInit {
  id:any;
  autoecole:any;
   constructor(private route: ActivatedRoute,
    private auth:AuthService,
     private dataService:DataService) { }
 
   ngOnInit(): void {
     this.id = Number(this.route.snapshot.paramMap.get('id'));
     this.auth.authStatus.subscribe( value =>{
      if(value){
        this.getAutoecoleVendreById();
      }
     })
     
   }
   getAutoecoleVendreById(){
     this.dataService.getAutoecoleVendreById(this.id).subscribe(data=>{
       this.autoecole = JSON.parse(data);
     })
   }
 }
 