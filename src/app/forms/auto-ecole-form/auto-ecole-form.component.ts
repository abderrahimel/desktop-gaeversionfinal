import { Component, OnInit } from '@angular/core';

import { TranslationService } from '../../services/translation.service';

import { of } from 'rxjs';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { AutoEcoleService } from 'src/app/services/auto-ecole.service';
import { Autoecoles } from 'src/app/classes/autoecoles';
@Component({
  selector: 'app-auto-ecole-form',
  templateUrl: './auto-ecole-form.component.html',
  styleUrls: ['./auto-ecole-form.component.css']
})
export class AutoEcoleFormComponent implements OnInit {
AE= new Autoecoles();

  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
  };

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.dots,
    toolbarSettings: {
      toolbarExtraButtons: [
        { text: "{{'souvegarder' | translate}}", class: 'btn btn-primary ajouter', event: () => { alert("Finished!!!"); } }
      ],
    }
  };

  isValidTypeBoolean: boolean = true;

  constructor(private ngWizardService: NgWizardService,private translateService: TranslationService, private  autoecoleservice: AutoEcoleService) { }

  ngOnInit(): void {
    this.translateService.applyLanguage();
  }

  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }
 
  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }
 
  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }
 
  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }
 
  stepChanged(args: StepChangedArgs) {
    console.log(args.step);
  }
 
  isValidFunctionReturnsBoolean(args: StepValidationArgs) {
    return true;
  }
 
  isValidFunctionReturnsObservable(args: StepValidationArgs) {
    return of(true);
  }
  AddAutoEcole(){
    this.autoecoleservice.insertAutoEcole(this.AE).subscribe(res =>{
      console.log(res)
    });

}
}