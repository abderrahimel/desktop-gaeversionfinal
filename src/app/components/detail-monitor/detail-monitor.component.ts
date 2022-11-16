import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-detail-monitor',
  templateUrl: './detail-monitor.component.html',
  styleUrls: ['./detail-monitor.component.css']
})
export class DetailMonitorComponent implements OnInit {
  id:any;
  moniteur:any;
   user:any;
   constructor(private route: ActivatedRoute,
    private auth:AuthService,
     private dataService:DataService) { }
 
   ngOnInit(): void {
     this.id = Number(this.route.snapshot.paramMap.get('id'));
     this.auth.authStatus.subscribe(value=>{
      if(value){
        this.getMoniteurJobById()
      }
     })
   }
   getMoniteurJobById(){
     this.dataService.getMoniteurJobById(this.id).subscribe(data=>{
       this.moniteur = JSON.parse(data);
       this.moniteur.created_at = this.moniteur?.created_at.split('T')[0];
     })
   }
 }
 