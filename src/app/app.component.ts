import { Component } from '@angular/core';
import { TranslationService } from './services/translation.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AutoEcoleApp';
  
  constructor(private translateService :TranslationService,
              public router : Router,
              private store: Store<AppState>
              ){
                
                     
  }
  ngOnInit(): void {
    this.translateService.applyLanguage();
    
  }
  
 
}



interface User {
  login: any;
  email: any;
  name: any;
  type: any;
}
interface AppState {
  user: User;
}
