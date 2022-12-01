import { createAction, props } from "@ngrx/store";

export const loadExamenReussiAction = createAction('[examen] load examen', props<{idAutoEcole:any}>()); 
export const loadExamenReussiToStore = createAction("[examen] load examen to store", props<{payload:any}>()); 
export const setExamenReussiInTheStore = createAction("[examen] set examen in the store"); 
export const setloadingToFalse = createAction("[examen] set loading to false"); 
export const removeExamenReussiAction = createAction('[vehicule] remove vehicule');