import { createAction, props } from "@ngrx/store";

export const loadblogadminaction = createAction('[blog admin] load blog admin'); 
export const loadblogadmintostoreaction = createAction('[blog admin] load blog admin to store',props<{payload:any}>());