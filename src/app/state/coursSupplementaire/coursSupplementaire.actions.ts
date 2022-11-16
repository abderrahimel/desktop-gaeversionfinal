import { createAction, props } from "@ngrx/store";

export const loadcoursSupplementaire = createAction('[cours Supplementaire] load cours Supplementaire', props<{idAutoEcole:any}>()); 
export const loadcoursSupplementaireToStore = createAction("[cours Supplementaire] load cours Supplementaire to store", props<{basic:any, supplementaire:any}>()); 

