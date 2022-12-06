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
import { AuthService } from "src/app/services/auth/auth.service";
import { Store } from "@ngrx/store";
import { MoniteurJobState } from "src/app/state/moniteurJob/moniteurJob.state";
import { take } from "rxjs/operators";
import { loadMoniteurJob } from "src/app/state/moniteurJob/moniteurJob.actions";


@Component({
  selector: 'app-monitors',
  templateUrl: './monitors.component.html',
  styleUrls: ['./monitors.component.css']
}) 
export class MonitorsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  moniteurs!: Observable<any>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
 actualites:any;
 moniteurJob:any;
 nmoniteurJob:any;
 slideConfig = {slidesToShow: 1,
  infinite: true,
  variableWidth: true,
  outerEdgeLimit: true,
  nextArrow: '<div style=\'position: absolute; top: 35%; right: 5px; cursor: pointer;color:red; border-radius:50%;padding:7px;border:1px solid rgb(252, 248, 248);background:rgb(252, 248, 248)\' class=\'next-slide\'><i class="fa fa-angle-double-right"></i></div>',
  prevArrow: '<div style=\'position: absolute; top: 35%; left: 5px; z-index: 1; cursor: pointer;color:red; border-radius:50%;padding:7px;border:1px solid rgb(252, 248, 248);background:rgb(252, 248, 248)\' class=\'next-slide\'><i class="fa fa-angle-double-left"></i></div>',};
  constructor(private dataService:DataService,
              private auth:AuthService,
              private store:Store<{moniteurJob: MoniteurJobState}>,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.auth.authStatus.subscribe(value=>{
      if(value){
        this.getMoniteurJob()
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
  getMoniteurJob(){
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.moniteurJob.moniteurJob.loaded){
        this.store.dispatch(loadMoniteurJob());
      }
      this.store.select(state=>state.moniteurJob.moniteurJob.moniteurJob).subscribe(moniteurJob=>{
        this.moniteurJob = moniteurJob
        if(this.moniteurJob){
          this.nmoniteurJob = this.moniteurJob.reduce((acc, o) => acc + Object.keys(o).length, 0);
        }else{
          this.nmoniteurJob = 0
        }
      })
    })
    // this.dataService.getMoniteurJob().subscribe(data=>{
    //   this.actualites = JSON.parse(data)
    //   this.actualites.map(blog=>{
    //     blog.created_at = blog?.created_at.split('T')[0];
    //     if(blog.description.length > 107){
    //       blog.description = blog.description.substring(0, 107) + '...';
    //     }
    //   });
    //    this.dataSource  =  new MatTableDataSource<any>(this.actualites);
    //    this.dataSource.data = this.actualites
    //    this.changeDetectorRef.detectChanges();
    //    this.dataSource.paginator = this.paginator;
    //    this.moniteurs = this.dataSource.connect();
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
    this.moniteurs = this.dataSource.connect();
  
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
