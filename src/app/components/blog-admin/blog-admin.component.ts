import {  AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { BlogmodalComponent } from 'src/app/modal/blogmodal/blogmodal.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data.service';
import { BlogState } from 'src/app/state/blog/blog.state';
import { loadblogadminaction } from 'src/app/state/blog/bnlog.actions';
import Swal from 'sweetalert2';
declare var $;
@Component({
  selector: 'app-blog-admin',
  templateUrl: './blog-admin.component.html',
  styleUrls: ['./blog-admin.component.css']
})
export class BlogAdminComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['image', 'titre', 'actions'];    
  dataSource!: MatTableDataSource<any>;
  posts:any;
  n:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dateVal = new Date();
  blogs:any;
  form = new FormGroup({           
    titre: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
  });
  constructor(private   dataServece: DataService,
             private   modalService: NgbModal,
             private store: Store<{blog: BlogState}>,
             private auth:AuthService
    ) { }

  ngOnInit(): void {
    this.auth.authStatus.subscribe(value=>{
      if(value){
        this.getBlogs();
      }
    })
  }
  ngAfterViewInit() {

   }
 getAllBlogs(){
  this.store.pipe(take(1)).subscribe(store=>{
    if(!store.blog.blog.loaded){
      this.store.dispatch(loadblogadminaction())
    }
  })
  this.store.select(state=>state.blog.blog.blog).subscribe(blogs=>{
    this.blogs = blogs;
    this.dataSource = new MatTableDataSource(this.blogs)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  })

 }
 getBlogs(){
  this.dataServece.getBlogs().subscribe(data=>{
    this.blogs = JSON.parse(data)
    this.dataSource = new MatTableDataSource(this.blogs)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  })
 }
 applyFilter(event:any){
  let value = event.target.value
  this.dataSource.filter = value.trim().toLowerCase()
}
deletBlog(id:any){
  Swal.fire({
    title: 'confirmation',
    text: "Vous voulez vraiment confirmer la supprition!",
    icon: 'error',
    showCancelButton: true,
    cancelButtonText: 'annuler',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'oui , supprimer'
  }).then((result) => {
    if (result.isConfirmed) {
      this.dataServece.deletBlog(id).subscribe(data=>{
        this.store.dispatch(loadblogadminaction())
        this.getBlogs()
      })
    }
  })

}
open(data:any, btn:any){
  const modalRef = this.modalService.open(BlogmodalComponent);
  modalRef.componentInstance.btn = btn;
  modalRef.componentInstance.data = data;
  }
}
