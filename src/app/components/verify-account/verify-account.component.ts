import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import {ToastrService} from 'ngx-toastr'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {
  dateVal = new Date();
  form = new FormGroup({});
  constructor(private dataService:DataService,
              public toastr: ToastrService,
              private router:Router
    ) { }

  ngOnInit(): void {
    // this.dataService.getData().subscribe(data=>console.log(data));
  }
  resendEmail(){
    this.dataService.resendEmail().subscribe(data=>{
      this.alertMessage("veuillez vérifier votre email")
    })
  }

  logout(){
    localStorage.clear()
    this.router.navigateByUrl('/login');
  }

   alertMessage(message:any){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: message
    })
  }
}