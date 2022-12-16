import { createAction, props } from "@ngrx/store";

export const loadExamenNoReussiAction = createAction('[examen no reussi] load examen no reussi', props<{idAutoEcole:any}>()); 
export const loadExamenNReussitostore = createAction("[examen no reussi] load examen no reussi to store", props<{payload:any}>()); 