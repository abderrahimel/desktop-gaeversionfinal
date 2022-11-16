import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-detail-ecole',
  templateUrl: './detail-ecole.component.html',
  styleUrls: ['./detail-ecole.component.css']
})
export class DetailEcoleComponent implements OnInit {
 id:any;
 autoecole:any;
  user:any;
  logged:boolean = false;
  constructor(private route: ActivatedRoute,
    private auth:AuthService,
    private dataService:DataService) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.auth.authStatus.subscribe( value =>{
          if(value){ // if the current user logged
            this.getEcoleById()
          }else{
           // hide the spinner
           
          }
    })
    
  }
  getEcoleById(){
    this.dataService.getAutoEcoleById(this.id).subscribe(data=>{
      this.autoecole = data;
      this.dataService.getUserById(this.autoecole?.user_id).subscribe(data=>{
        this.user = data;
        
      })
    })
  }
}
