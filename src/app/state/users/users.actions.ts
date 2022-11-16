import { createAction, props } from "@ngrx/store";

export const loadusersaction = createAction('[users] load users'); 
export const loaduserstostoreaction = createAction("[users] load users to store", props<{payload:any}>()); 