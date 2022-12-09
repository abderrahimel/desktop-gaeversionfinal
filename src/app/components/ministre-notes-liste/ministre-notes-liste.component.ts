import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-ministre-notes-liste',
  templateUrl: './ministre-notes-liste.component.html',
  styleUrls: ['./ministre-notes-liste.component.css']
})
export class MinistreNotesListeComponent implements OnInit {
  dbTelecharhement:any;
  id:any;
  title:any;
  constructor(private dataService:DataService,
              private router:Router,
              private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getData();
  }

 getId(){
    return Number(this.route.snapshot.paramMap.get('id'));
  }
  getData(){
     this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getNoteMinisterielle().subscribe(data=>{
      this.dbTelecharhement = JSON.parse(data);
      if(Number(this.route.snapshot.paramMap.get('id')) == 1){
        // filter from the data just
        this.title = 'المذكرات الوزارية';
        this.dbTelecharhement =  this.dbTelecharhement.filter((data:any)=>data.category == this.title);
      }else if(Number(this.route.snapshot.paramMap.get('id')) == 2){
        // filter from the data just 
        this.title = 'بلاغ صحفي';
        this.dbTelecharhement =  this.dbTelecharhement.filter((data:any)=>data.category == this.title);
      }else if(Number(this.route.snapshot.paramMap.get('id')) == 3){
        // filter from the data just  دفتر تحملات المتعلق بفتح واستغلال مؤسسات تعليم السياقة
         this.title = 'دفتر تحملات المتعلق بفتح واستغلال مؤسسات تعليم السياقة';
        this.dbTelecharhement =  this.dbTelecharhement.filter((data:any)=>data.category == this.title);
      }else{
         //  else  قرارات ومراسيم خاصة بمدونة السير 52.05
        this.title = 'قرارات ومراسيم خاصة بمدونة السير 52.05';
         this.dbTelecharhement =  this.dbTelecharhement.filter((data:any)=>data.category == this.title);
        }
    })
     
  }
}