import { createAction, props } from "@ngrx/store";

export const loadExamenAction = createAction('[examen] load examen', props<{idAutoEcole:any}>()); 
export const loadExamenToStore = createAction("[examen] load examen to store", props<{payload:any}>()); 
export const setExamenInTheStore = createAction("[examen] set examen in the store"); 
export const setloadingToFalse = createAction("[examen] set loading to false"); 
export const updateExamen = createAction("[examen] update examen ", props<{id:any, data:any}>()); 
export const addExamen = createAction("[examen] update examen ", props<{idAutoEcole:any, data:any}>()); 
export const loadedExamenToStore = createAction("[examen] loaded examen to store"); 
export const removeExamenAction = createAction('[vehicule] remove vehicule');
