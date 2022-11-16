import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-detail-blog',
  templateUrl: './detail-blog.component.html',
  styleUrls: ['./detail-blog.component.css']
})
export class DetailBlogComponent implements OnInit {
  dateVal = new Date();
  id:any;
  blog:any;
  image:any;
  description:any;
  titre:any;
  date:any;
  constructor(private route: ActivatedRoute,
              private dataService:DataService,
              private _route: Router,
    ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getBlogById();
  }
  back(){
    this._route.navigateByUrl('/dashboard')
 }
  getBlogById(){
    this.dataService.getBlogById(this.id).subscribe(data=>{
      this.blog = data;
      this.image = this.blog.image
      this.date = this.blog.created_at.split('T')[0];
      this.description = this.blog.description; 
      this.titre = this.blog.titre 
    })
  }
}
