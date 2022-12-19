import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef, AfterViewInit
} from "@angular/core";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from "rxjs";
import { DataService } from 'src/app/services/data.service';
import * as _ from 'lodash';
import { Store } from "@ngrx/store";
import { BlogState } from "src/app/state/blog/blog.state";
import { loadblogadminaction } from "src/app/state/blog/blog.actions";
import { take } from "rxjs/operators";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent  implements OnInit, OnDestroy, AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  blogs!: Observable<any>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  nblogs:any;
  actualite:any;
  slideConfig = {slidesToShow: 1,
  infinite: true,
  variableWidth: true,
  outerEdgeLimit: true,
  nextArrow: '<div style=\'position: absolute; top: 35%; right: 5px; cursor: pointer;color:red; border-radius:50%;padding:7px;border:1px solid rgb(252, 248, 248);background:rgb(252, 248, 248)\' class=\'next-slide\'><i class="fa fa-angle-double-right"></i></div>',
  prevArrow: '<div style=\'position: absolute; top: 35%; left: 5px; z-index: 1; cursor: pointer;color:red; border-radius:50%;padding:7px;border:1px solid rgb(252, 248, 248);background:rgb(252, 248, 248)\' class=\'next-slide\'><i class="fa fa-angle-double-left"></i></div>',};
 actualites:any;
  constructor(private dataService:DataService,
              private store:Store<{blog: BlogState}>,
              private auth:AuthService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.auth.authStatus.subscribe(value=>{
    if(value){
      this.getBlogs()
    }
  })
  }
  ngAfterViewInit(): void {
    this.dataSource  =  new MatTableDataSource<any>(this.actualites);
    this.changeDetectorRef.detectChanges();
  }
  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }
    getBlogs(){
      this.store.pipe(take(1)).subscribe(store=>{
        if(!store.blog.blog.loaded){
          this.store.dispatch(loadblogadminaction())
        }
        this.store.select(state=>state.blog.blog.blog).subscribe(blogs=>{
          this.actualite = blogs
          // if(this.blogs){
          //   this.nblogs = this.blogs.reduce((acc, o) => acc + Object.keys(o).length, 0);
          // }else{
          //   this.nblogs = 0
          // }
        })
      })
     
    // this.dataService.getBlogs().subscribe(data=>{
    //   this.actualites = JSON.parse(data)
    //   this.actualites.map(blog=>{
    //     blog.created_at = blog?.created_at.split('T')[0];
    //     blog.titre = blog.titre.substring(0, 20) + '...';
    //     blog.description = blog.description.substring(0, 70) + '...';
    //   });
    //    this.dataSource  =  new MatTableDataSource<any>(this.actualites);
    //    this.dataSource.data = this.actualites
    //    this.changeDetectorRef.detectChanges();
    //    this.dataSource.paginator = this.paginator;
    //    this.blogs = this.dataSource.connect();
       
    // })
  }
  applyFilter(event:any){
    let value = event.target.value
    this.dataSource.filter = value.trim().toLowerCase()
  }
  onchangeInput(e:any){
    if(e.target.value === ''){
      this.dataSource = new MatTableDataSource(this.actualites);
    }else{
        let filterData = _.filter(this.actualites, (item)=>{
             return item.titre.toLowerCase() == e.target.value.toLowerCase();
         
        })
       
        this.dataSource = new MatTableDataSource(filterData);
       
    }
  
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.blogs = this.dataSource.connect();
  }
  trackById(index: number, item: any) {
    return item.id
}
trackByIdvehicule(index: number, item: any) {
  return item.id
}
trackByIdMoniteur(index: number, item: any) {
  return item.id
}
trackByIdAutoEcoleVendre(index: number, item: any) {
  return item.id
}
trackByIdAutoEcoleAbonnee(index: number, item: any) {
  return item.id
}

addSlide() {
}
    
removeSlide() {
}
    
slickInit(e) {
}
    
breakpoint(e) {
}

afterChange(e) {
}

beforeChange(e) {
}  
}