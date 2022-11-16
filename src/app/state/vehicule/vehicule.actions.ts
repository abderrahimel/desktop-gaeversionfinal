import { createAction, props } from "@ngrx/store";

export const loadViheculeAction = createAction('[vehicule] load vehicule', props<{id:any}>()); 
export const loadViheculeToStore = createAction("[vehicule] load vehicule to store", props<{payload:any}>()); 
export const removeVehiculeAction = createAction('[vehicule] remove vehicule',props<{payload:any}>());
