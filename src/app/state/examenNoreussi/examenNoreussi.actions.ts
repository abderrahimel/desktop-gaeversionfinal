import { createAction, props } from "@ngrx/store";

export const loadExamenNoReussiAction = createAction('[examen] load examen', props<{idAutoEcole:any}>()); 
export const loadExamenNoReussiToStore = createAction("[examen] load examen to store", props<{payload:any}>()); 