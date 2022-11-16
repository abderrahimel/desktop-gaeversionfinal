import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import $ from 'jquery';


@Injectable({
  providedIn: 'root'
})

export class TranslationService {

  public langue = localStorage.getItem('lang') || 'en-FR';
  constructor(private translateService :TranslateService) { }

  public selectLanguage(lang : any){
    localStorage.setItem('lang', lang);
    this.langue=lang;
    this.applyLanguage();
}


  public applyLanguage(){
    if( this.langue == 'en-AR' )
    {
      $('body').addClass('rtl');
      $('#sidebar').addClass('rds');
      $('#form-font').addClass('fnt');
      $('#form2-font').addClass('fnt');
      $('#button1-fnt').addClass('fnt');
      $('#button2-fnt').addClass('fnt');
      $('#button3-fnt').addClass('fnt');
     
    } else {
      $('body').removeClass('rtl');
      $('#sidebar').removeClass('rds');
      $('#form-font').removeClass('fnt');//wizard step1
      $('#form2-font').removeClass('fnt');//wizard step 2
      $('#button1-fnt').removeClass('fnt');//wizard button 1
      $('#button2-fnt').removeClass('fnt');
      $('#button3-fnt').removeClass('fnt');
    }
     this.translateService.use(this.langue);

}


}
